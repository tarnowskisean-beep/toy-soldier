// ToyMacroCameraComponent.cpp — Script 1 implementation.

#include "ToyMacroCameraComponent.h"

#include "CineCameraComponent.h"
#include "Engine/World.h"
#include "TimerManager.h"
#include "GameFramework/Actor.h"

UToyMacroCameraComponent::UToyMacroCameraComponent()
{
	// We don't tick — a 0.03s timer is plenty for focus and avoids per-frame cost.
	PrimaryComponentTick.bCanEverTick = false;
}

void UToyMacroCameraComponent::BeginPlay()
{
	Super::BeginPlay();

	// Resolve the camera if the designer didn't wire one up.
	if (!TargetCamera && GetOwner())
	{
		TargetCamera = GetOwner()->FindComponentByClass<UCineCameraComponent>();
	}

	CurrentFocusDistance = FallbackFocusDistance;

	if (TargetCamera)
	{
		// Put the lens in manual-focus so WE control the focal plane each update.
		TargetCamera->FocusSettings.FocusMethod = ECameraFocusMethod::Manual;
		TargetCamera->FocusSettings.ManualFocusDistance = CurrentFocusDistance;
		TargetCamera->CurrentAperture = Aperture;

		if (UWorld* World = GetWorld())
		{
			World->GetTimerManager().SetTimer(
				FocusTimerHandle, this, &UToyMacroCameraComponent::UpdateFocus,
				FMath::Max(UpdateInterval, 0.005f), /*bLoop=*/true);
		}
	}
}

void UToyMacroCameraComponent::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(FocusTimerHandle);
	}
	Super::EndPlay(EndPlayReason);
}

void UToyMacroCameraComponent::UpdateFocus()
{
	if (!TargetCamera)
	{
		return;
	}

	const FVector Start = TargetCamera->GetComponentLocation();
	const FVector End = Start + TargetCamera->GetForwardVector() * MaxTraceDistance;

	FHitResult Hit;
	FCollisionQueryParams Params(SCENE_QUERY_STAT(ToyMacroFocus), /*bTraceComplex=*/false, GetOwner());
	const bool bHit = GetWorld()->LineTraceSingleByChannel(Hit, Start, End, ECC_Visibility, Params);

	// Focus distance = distance to what we're looking at, or the fallback for sky.
	const float TargetFocus = bHit ? FVector::Dist(Start, Hit.ImpactPoint) : FallbackFocusDistance;

	// Glide so the focal plane doesn't snap when looking across varying depths.
	CurrentFocusDistance = FMath::FInterpTo(CurrentFocusDistance, TargetFocus, UpdateInterval, FocusInterpSpeed);

	TargetCamera->FocusSettings.ManualFocusDistance = CurrentFocusDistance;
	TargetCamera->CurrentAperture = Aperture;
}
