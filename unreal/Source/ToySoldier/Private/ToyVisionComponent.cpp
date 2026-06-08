// ToyVisionComponent.cpp — cone detection with a detection meter.

#include "ToyVisionComponent.h"
#include "ToySoldier.h"
#include "ToyHUDTypes.h"   // ESquadOrder
#include "EngineUtils.h"
#include "Engine/World.h"

UToyVisionComponent::UToyVisionComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.15f;   // sentries don't need 60Hz eyes
}

void UToyVisionComponent::TickComponent(float DeltaTime, ELevelTick TickType,
	FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	if (!Owner.IsValid()) Owner = Cast<AToySoldier>(GetOwner());
	if (!Owner.IsValid() || !Owner->IsAlive()) return;

	AToySoldier* Seen = FindVisibleGreen();
	if (Seen)
	{
		TimeSinceSeen = 0.f;
		Awareness = FMath::Min(1.f, Awareness + DeltaTime / FMath::Max(0.01f, TimeToDetect));
		if (Awareness >= 1.f && !bAlerted)
		{
			Spot(Seen);
		}
		else if (bAlerted)
		{
			// Keep the alert fresh on the current target.
			Owner->AttackTarget = Seen;
		}
	}
	else
	{
		TimeSinceSeen += DeltaTime;
		Awareness = FMath::Max(0.f, Awareness - DeltaTime / FMath::Max(0.01f, ForgetTime));
		if (bAlerted && TimeSinceSeen >= ForgetTime)
		{
			Calm();
		}
	}
}

AToySoldier* UToyVisionComponent::FindVisibleGreen() const
{
	const FVector Eye = Owner->GetActorLocation() + FVector(0, 0, 40.f);
	const FVector Fwd = Owner->GetActorForwardVector();
	const float CosHalf = FMath::Cos(FMath::DegreesToRadians(ViewHalfAngleDeg));
	const float DistSq = FMath::Square(ViewDistance);

	AToySoldier* Best = nullptr;
	float BestD = DistSq;

	for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
	{
		AToySoldier* S = *It;
		if (S->Team != EToyTeam::Green || !S->IsAlive()) continue;

		const FVector To = S->GetActorLocation() - Owner->GetActorLocation();
		const float D2 = To.SizeSquared();
		if (D2 > BestD) continue;
		if (FVector::DotProduct(Fwd, To.GetSafeNormal()) < CosHalf) continue;  // outside cone

		// Line of sight (ignore self + target so only world geometry blocks).
		FHitResult Hit;
		FCollisionQueryParams P(SCENE_QUERY_STAT(VisionLOS), false, Owner.Get());
		P.AddIgnoredActor(S);
		const FVector Target = S->GetActorLocation() + FVector(0, 0, 40.f);
		if (GetWorld()->LineTraceSingleByChannel(Hit, Eye, Target, ECC_Visibility, P)) continue;

		BestD = D2;
		Best = S;
	}
	return Best;
}

void UToyVisionComponent::Spot(AToySoldier* Target)
{
	bAlerted = true;
	Awareness = 1.f;
	if (Owner.IsValid())
	{
		Owner->Order = ESquadOrder::Attack;   // the sentry now engages
		Owner->AttackTarget = Target;
	}
	OnTargetSpotted.Broadcast(Target);        // → trigger a reinforcement spawner
}

void UToyVisionComponent::Calm()
{
	bAlerted = false;
	Awareness = 0.f;
	if (Owner.IsValid())
	{
		Owner->Order = ESquadOrder::Hold;     // resume patrol/standing
		Owner->AttackTarget = nullptr;
	}
}
