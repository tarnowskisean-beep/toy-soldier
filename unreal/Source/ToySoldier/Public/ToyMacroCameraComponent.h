// ToyMacroCameraComponent.h — Script 1: Dynamic Macro Lens Camera.
//
// Drives a CineCameraComponent so the camera behaves like a real macro photo lens:
// it traces forward, finds whatever you're looking at, and pulls focus there with a
// very shallow depth of field (low f-stop) to sell the tiny toy scale.
//
// We use a CineCameraComponent (not raw PostProcess DoF) because only the cine camera
// exposes the Manual focus-method + aperture controls the design calls for.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ToyMacroCameraComponent.generated.h"

class UCineCameraComponent;

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UToyMacroCameraComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UToyMacroCameraComponent();

	/** The cine camera to drive. If left empty, we find the first one on the owner. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy Macro Lens")
	TObjectPtr<UCineCameraComponent> TargetCamera = nullptr;

	/** Max forward trace distance (macro-scale limit), in cm. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy Macro Lens", meta = (ClampMin = "100.0"))
	float MaxTraceDistance = 2000.f;

	/** Focus distance used when the trace hits nothing (looking at the skybox). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy Macro Lens")
	float FallbackFocusDistance = 1500.f;

	/** Aperture as an f-stop. Low values (f/1.4–f/2.0) = very shallow, toy-like DoF. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy Macro Lens", meta = (ClampMin = "0.5"))
	float Aperture = 1.4f;

	/** How fast the focus glides to a new target (higher = snappier). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy Macro Lens")
	float FocusInterpSpeed = 8.f;

	/** Run the focus update on a timer instead of every frame (cheaper). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy Macro Lens", meta = (ClampMin = "0.0"))
	float UpdateInterval = 0.03f;

protected:
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;

private:
	float CurrentFocusDistance = 1500.f;
	FTimerHandle FocusTimerHandle;

	void UpdateFocus();
};
