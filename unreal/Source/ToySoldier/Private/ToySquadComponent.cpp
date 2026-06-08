// ToySquadComponent.cpp — switching, orders, formation, medic heal, HUD views.

#include "ToySquadComponent.h"
#include "ToySoldier.h"
#include "ToyClassData.h"
#include "PlasticHealthComponent.h"
#include "GameFramework/PlayerController.h"

UToySquadComponent::UToySquadComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
}

void UToySquadComponent::TickComponent(float DeltaTime, ELevelTick TickType,
	FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	UpdateFormation();
	MedicHeal(DeltaTime);

	// If the soldier you were controlling went down, jump to a survivor.
	AToySoldier* Active = GetActive();
	if (!Active || !Active->IsAlive())
	{
		const int32 Next = FirstAliveIndex();
		if (Next != INDEX_NONE) SetActive(Next);
	}
}

void UToySquadComponent::InitializeSquad()
{
	for (AToySoldier* M : Members)
	{
		if (M) { M->Order = ESquadOrder::Follow; M->SetPlayerControlled(false); }
	}
	ActiveIndex = FirstAliveIndex();
	if (ActiveIndex != INDEX_NONE) SetActive(ActiveIndex);
}

AToySoldier* UToySquadComponent::GetActive() const
{
	return Members.IsValidIndex(ActiveIndex) ? Members[ActiveIndex] : nullptr;
}

void UToySquadComponent::SetActive(int32 Index)
{
	if (!Members.IsValidIndex(Index) || !Members[Index] || !Members[Index]->IsAlive())
	{
		return;
	}

	APlayerController* PC = Cast<APlayerController>(GetOwner());
	if (!PC) return;

	// The one you leave keeps its standing order and reverts to AI.
	if (AToySoldier* Old = GetActive())
	{
		Old->SetPlayerControlled(false);
		Old->Order = ESquadOrder::Follow;
		Old->SpawnDefaultController();        // hand it back to an AI controller
	}

	ActiveIndex = Index;
	AToySoldier* NewActive = Members[Index];
	PC->Possess(NewActive);
	NewActive->SetPlayerControlled(true);
}

void UToySquadComponent::CycleNext()
{
	const int32 Count = Members.Num();
	for (int32 N = 1; N <= Count; ++N)
	{
		const int32 I = (ActiveIndex + N) % Count;
		if (Members.IsValidIndex(I) && Members[I] && Members[I]->IsAlive())
		{
			SetActive(I);
			return;
		}
	}
}

void UToySquadComponent::IssueCommand(EToyCommand Command, const FVector& AimPoint, AActor* AimTarget)
{
	if (Command == EToyCommand::Ability)
	{
		AToySoldier* Active = GetActive();
		if (!Active) return;
		// Medic's press-ability is revive (the squad knows who's down); the Leader's
		// is the grenade, handled by the soldier. Heavy/Sniper are hold-abilities.
		if (Active->ClassData && Active->ClassData->Ability == EAbilityType::Revive)
		{
			if (Active->TryConsumeAbility()) ReviveNearbyDowned(Active);
		}
		else
		{
			Active->ActivateAbility(AimPoint);
		}
		return;
	}

	for (int32 i = 0; i < Members.Num(); ++i)
	{
		if (i == ActiveIndex) continue;          // orders go to the OTHERS
		AToySoldier* M = Members[i];
		if (!M || !M->IsAlive()) continue;

		switch (Command)
		{
		case EToyCommand::Move:    M->Order = ESquadOrder::Move;   M->MoveGoal = AimPoint; M->AttackTarget = nullptr; break;
		case EToyCommand::Attack:  M->Order = ESquadOrder::Attack; M->AttackTarget = AimTarget; break;
		case EToyCommand::Hold:    M->Order = ESquadOrder::Hold;   M->AttackTarget = nullptr; break;
		case EToyCommand::Regroup: M->Order = ESquadOrder::Follow; M->AttackTarget = nullptr; break;
		default: break;
		}
	}
}

bool UToySquadComponent::IsSquadAlive() const
{
	for (AToySoldier* M : Members)
	{
		if (M && M->IsAlive()) return true;
	}
	return false;
}

void UToySquadComponent::BuildHudViews(TArray<FSquadMemberView>& OutViews) const
{
	OutViews.Reset();
	static const TCHAR* Callsigns[] = { TEXT("ABLE-1"), TEXT("ABLE-2"), TEXT("BRAVO-1"), TEXT("BRAVO-2") };

	for (int32 i = 0; i < Members.Num(); ++i)
	{
		const AToySoldier* M = Members[i];
		FSquadMemberView V;
		if (M)
		{
			V.ClassType = M->ClassData ? M->ClassData->ClassType : EToyClass::Leader;
			V.Callsign = (i < 4) ? Callsigns[i] : FString::Printf(TEXT("UNIT-%d"), i + 1);
			V.IntegrityPct = M->GetIntegrityPct();
			V.Ammo = M->Ammo;
			V.AmmoReserve = M->AmmoReserve;
			V.Order = M->Order;
			V.bPlayerControlled = (i == ActiveIndex);
			V.bDowned = !M->IsAlive();
		}
		OutViews.Add(V);
	}
}

void UToySquadComponent::ReviveNearbyDowned(AToySoldier* Medic)
{
	if (!Medic) return;
	for (AToySoldier* M : Members)
	{
		if (!M || M == Medic || M->IsAlive()) continue;   // only downed mates
		if (FVector::Dist(M->GetActorLocation(), Medic->GetActorLocation()) < MedicRange)
		{
			M->Revive(0.5f);
			return;   // one revive per activation
		}
	}
}

// --- internals ---
void UToySquadComponent::UpdateFormation()
{
	const AToySoldier* Active = GetActive();
	if (!Active) return;

	// Slots laid out behind the active soldier (left, right, rear), rotated to face.
	const FVector Fwd = Active->GetActorForwardVector();
	const FVector Right = Active->GetActorRightVector();
	const FVector Base = Active->GetActorLocation();
	const FVector Offsets[3] = {
		-Fwd * FormationSpacing - Right * FormationSpacing,
		-Fwd * FormationSpacing + Right * FormationSpacing,
		-Fwd * FormationSpacing * 2.f
	};

	int32 Slot = 0;
	for (int32 i = 0; i < Members.Num(); ++i)
	{
		if (i == ActiveIndex || !Members[i] || !Members[i]->IsAlive()) continue;
		Members[i]->FormationSlot = Base + Offsets[Slot % 3];
		++Slot;
	}
}

void UToySquadComponent::MedicHeal(float Dt)
{
	AToySoldier* Medic = nullptr;
	for (AToySoldier* M : Members)
	{
		if (M && M->IsAlive() && M->ClassData && M->ClassData->ClassType == EToyClass::Medic)
		{
			Medic = M; break;
		}
	}
	if (!Medic) return;

	for (AToySoldier* M : Members)
	{
		if (!M || M == Medic || !M->IsAlive()) continue;
		if (FVector::Dist(M->GetActorLocation(), Medic->GetActorLocation()) < MedicRange)
		{
			if (UPlasticHealthComponent* H = M->FindComponentByClass<UPlasticHealthComponent>())
			{
				H->Heal(MedicHealRate * Dt);
			}
		}
	}
}

int32 UToySquadComponent::FirstAliveIndex() const
{
	for (int32 i = 0; i < Members.Num(); ++i)
	{
		if (Members[i] && Members[i]->IsAlive()) return i;
	}
	return INDEX_NONE;
}
