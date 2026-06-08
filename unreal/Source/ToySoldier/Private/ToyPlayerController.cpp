// ToyPlayerController.cpp — input wiring, switching, wheel routing, HUD feed.

#include "ToyPlayerController.h"
#include "ToySquadComponent.h"
#include "ToySoldier.h"
#include "ToyHUDWidget.h"
#include "ToyCommandWheelWidget.h"
#include "ToyHUDTypes.h"

#include "ToyMissionGameMode.h"
#include "ToyMissionComponent.h"
#include "ToyMissionData.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h"
#include "CineCameraComponent.h"
#include "Kismet/GameplayStatics.h"
#include "EngineUtils.h"
#include "Engine/World.h"

AToyPlayerController::AToyPlayerController()
{
	Squad = CreateDefaultSubobject<UToySquadComponent>(TEXT("Squad"));
}

void AToyPlayerController::BeginPlay()
{
	Super::BeginPlay();

	// Register the input mapping context.
	if (MappingContext)
	{
		if (auto* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(GetLocalPlayer()))
		{
			Subsystem->AddMappingContext(MappingContext, 0);
		}
	}

	// Create the HUD + command wheel.
	if (HUDWidgetClass)
	{
		HUD = CreateWidget<UToyHUDWidget>(this, HUDWidgetClass);
		if (HUD) HUD->AddToViewport();
	}
	if (WheelWidgetClass)
	{
		Wheel = CreateWidget<UToyCommandWheelWidget>(this, WheelWidgetClass);
		if (Wheel) Wheel->AddToViewport();   // starts hidden via NativeConstruct
	}

	// Take control of the squad (Members are assigned in the level/BP).
	if (Squad) Squad->InitializeSquad();
}

void AToyPlayerController::SetupInputComponent()
{
	Super::SetupInputComponent();

	auto* EIC = Cast<UEnhancedInputComponent>(InputComponent);
	if (!EIC) return;

	if (IA_Move)    EIC->BindAction(IA_Move, ETriggerEvent::Triggered, this, &AToyPlayerController::OnMove);
	if (IA_Look)    EIC->BindAction(IA_Look, ETriggerEvent::Triggered, this, &AToyPlayerController::OnLook);
	if (IA_Fire)    EIC->BindAction(IA_Fire, ETriggerEvent::Triggered, this, &AToyPlayerController::OnFire);
	if (IA_Ability) EIC->BindAction(IA_Ability, ETriggerEvent::Started, this, &AToyPlayerController::OnAbility);
	if (IA_Cycle)   EIC->BindAction(IA_Cycle, ETriggerEvent::Started, this, &AToyPlayerController::OnCycle);
	if (IA_Wheel)
	{
		EIC->BindAction(IA_Wheel, ETriggerEvent::Started, this, &AToyPlayerController::OnWheelStarted);
		EIC->BindAction(IA_Wheel, ETriggerEvent::Completed, this, &AToyPlayerController::OnWheelReleased);
	}
	if (IA_Aim)
	{
		EIC->BindAction(IA_Aim, ETriggerEvent::Started, this, &AToyPlayerController::OnAimStarted);
		EIC->BindAction(IA_Aim, ETriggerEvent::Completed, this, &AToyPlayerController::OnAimReleased);
	}
	// Keys 1–4 → select that squad member.
	if (IA_Select.IsValidIndex(0) && IA_Select[0]) EIC->BindAction(IA_Select[0], ETriggerEvent::Started, this, &AToyPlayerController::OnSelect1);
	if (IA_Select.IsValidIndex(1) && IA_Select[1]) EIC->BindAction(IA_Select[1], ETriggerEvent::Started, this, &AToyPlayerController::OnSelect2);
	if (IA_Select.IsValidIndex(2) && IA_Select[2]) EIC->BindAction(IA_Select[2], ETriggerEvent::Started, this, &AToyPlayerController::OnSelect3);
	if (IA_Select.IsValidIndex(3) && IA_Select[3]) EIC->BindAction(IA_Select[3], ETriggerEvent::Started, this, &AToyPlayerController::OnSelect4);
}

void AToyPlayerController::PlayerTick(float DeltaTime)
{
	Super::PlayerTick(DeltaTime);

	// While the wheel is open, steer the selection with the mouse.
	if (bWheelOpen && Wheel)
	{
		float DX = 0.f, DY = 0.f;
		GetInputMouseDelta(DX, DY);
		Wheel->AddSelectionInput(FVector2D(DX, DY));
	}

	// Hold-abilities: the active soldier's class decides what the aim button does.
	if (AToySoldier* S = Cast<AToySoldier>(GetPawn()))
	{
		const bool bSniper = S->ClassData && S->ClassData->Ability == EAbilityType::Scope;
		const bool bHeavy = S->ClassData && S->ClassData->Ability == EAbilityType::Suppress;
		S->SetZoomed(bSniper && bAimHeld);
		S->SetSuppressing(bHeavy && bAimHeld);
		if (bHeavy && bAimHeld) S->ApplySuppressionToEnemies();

		// Scope zoom: lerp the cine-camera focal length in/out.
		if (UCineCameraComponent* Cam = S->GetToyCamera())
		{
			const float Target = S->IsZoomed() ? ZoomFocalLength : DefaultFocalLength;
			CurrentFocalLength = FMath::FInterpTo(CurrentFocalLength, Target, DeltaTime, 10.f);
			Cam->CurrentFocalLength = CurrentFocalLength;
		}
	}

	UpdateHUD();
}

// ---------- Handlers ----------
void AToyPlayerController::OnMove(const FInputActionValue& Value)
{
	const FVector2D Axis = Value.Get<FVector2D>();
	APawn* P = GetPawn();
	if (!P) return;

	const FRotator YawRot(0.f, GetControlRotation().Yaw, 0.f);
	const FVector Forward = FRotationMatrix(YawRot).GetUnitAxis(EAxis::X);
	const FVector Right = FRotationMatrix(YawRot).GetUnitAxis(EAxis::Y);
	P->AddMovementInput(Forward, Axis.Y);
	P->AddMovementInput(Right, Axis.X);
}

void AToyPlayerController::OnLook(const FInputActionValue& Value)
{
	const FVector2D Axis = Value.Get<FVector2D>();
	// Scoped soldiers turn slower for precise aim.
	float Scale = 1.f;
	if (const AToySoldier* S = Cast<AToySoldier>(GetPawn()))
	{
		if (S->IsZoomed()) Scale = ZoomLookScale;
	}
	AddYawInput(Axis.X * Scale);
	AddPitchInput(Axis.Y * Scale);
}

void AToyPlayerController::OnFire(const FInputActionValue& /*Value*/)
{
	if (AToySoldier* S = Cast<AToySoldier>(GetPawn()))
	{
		FVector Point; AActor* Target = nullptr;
		GetAim(Point, Target);
		S->TryFire(Point);
	}
}

void AToyPlayerController::OnAbility(const FInputActionValue& /*Value*/)
{
	FVector Point; AActor* Target = nullptr;
	GetAim(Point, Target);
	if (Squad) Squad->IssueCommand(EToyCommand::Ability, Point, Target);
}

void AToyPlayerController::OnWheelStarted(const FInputActionValue& /*Value*/)
{
	if (Wheel) { Wheel->OpenWheel(); bWheelOpen = true; }
}

void AToyPlayerController::OnWheelReleased(const FInputActionValue& /*Value*/)
{
	if (!Wheel || !bWheelOpen) return;
	bWheelOpen = false;

	const EToyCommand Picked = Wheel->CloseAndPick();
	FVector Point; AActor* Target = nullptr;
	GetAim(Point, Target);
	if (Squad) Squad->IssueCommand(Picked, Point, Target);
}

void AToyPlayerController::OnAimStarted(const FInputActionValue& /*Value*/) { bAimHeld = true; }
void AToyPlayerController::OnAimReleased(const FInputActionValue& /*Value*/) { bAimHeld = false; }

void AToyPlayerController::OnCycle(const FInputActionValue& /*Value*/) { if (Squad) Squad->CycleNext(); }
void AToyPlayerController::OnSelect1() { if (Squad) Squad->SetActive(0); }
void AToyPlayerController::OnSelect2() { if (Squad) Squad->SetActive(1); }
void AToyPlayerController::OnSelect3() { if (Squad) Squad->SetActive(2); }
void AToyPlayerController::OnSelect4() { if (Squad) Squad->SetActive(3); }

// ---------- Helpers ----------
bool AToyPlayerController::GetAim(FVector& OutPoint, AActor*& OutTarget) const
{
	OutTarget = nullptr;

	const AToySoldier* S = Cast<AToySoldier>(GetPawn());
	const UCineCameraComponent* Cam = S ? S->GetToyCamera() : nullptr;
	if (!Cam)
	{
		OutPoint = GetPawn() ? GetPawn()->GetActorLocation() + GetPawn()->GetActorForwardVector() * 2000.f : FVector::ZeroVector;
		return false;
	}

	const FVector Start = Cam->GetComponentLocation();
	const FVector End = Start + Cam->GetForwardVector() * 8000.f;

	FHitResult Hit;
	FCollisionQueryParams Params(SCENE_QUERY_STAT(ToyAim), false, GetPawn());
	if (GetWorld()->LineTraceSingleByChannel(Hit, Start, End, ECC_Visibility, Params))
	{
		OutPoint = Hit.ImpactPoint;
		if (AToySoldier* Soldier = Cast<AToySoldier>(Hit.GetActor()))
		{
			if (Soldier->Team == EToyTeam::Tan) OutTarget = Soldier;   // an enemy
		}
		return true;
	}
	OutPoint = End;
	return false;
}

void AToyPlayerController::UpdateHUD()
{
	if (!HUD || !Squad) return;

	// Squad panel.
	TArray<FSquadMemberView> Views;
	Squad->BuildHudViews(Views);
	HUD->UpdateSquad(Views);

	// Weapon / ammo + low-integrity warning for the active soldier.
	if (const AToySoldier* Active = Squad->GetActive())
	{
		const FText Weapon = FText::FromString(TEXT("M4A1 PLASTIC OVERMOLD"));
		HUD->UpdateWeapon(Weapon, Active->Ammo, Active->AmmoReserve);
		HUD->SetWarning(FText::FromString(TEXT("WARNING: INCOMING FIRE // CRITICAL INTEGRITY")),
			Active->GetIntegrityPct() < 35.f);
	}

	// Minimap blips: every soldier, projected to the active soldier's facing.
	if (const AToySoldier* Active = Squad->GetActive())
	{
		const FVector Origin = Active->GetActorLocation();
		const float Yaw = Active->GetActorRotation().Yaw;

		TArray<FMinimapBlip> Blips;
		for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
		{
			AToySoldier* T = *It;
			if (!T->IsAlive()) continue;
			FMinimapBlip B;
			B.Local = UToyHUDWidget::ProjectToMinimap(T->GetActorLocation() - Origin, Yaw, MinimapRangeUU);
			B.bEnemy = (T->Team == EToyTeam::Tan);
			B.bPlayer = (T == Active);
			Blips.Add(B);
		}
		HUD->UpdateMinimap(Blips);
	}

	// Mission objectives + header (from the mission GameMode).
	if (AToyMissionGameMode* GM = Cast<AToyMissionGameMode>(UGameplayStatics::GetGameMode(this)))
	{
		if (UToyMissionComponent* M = GM->GetMissionComponent())
		{
			TArray<FObjectiveView> Objectives;
			M->BuildViews(Objectives);
			HUD->UpdateObjectives(Objectives);
			if (const UToyMissionData* Data = M->GetMission())
			{
				HUD->UpdateMissionHeader(Data->Title, Data->Subtitle);
			}
		}
	}
}
