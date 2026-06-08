// ToyObjectiveVolume.h — a box that reports objective progress when the squad enters.
//
// One actor covers most spatial objectives via its Mode:
//   ReachZone / Extract — completes when a green soldier first enters.
//   Collect / Rescue    — same, but flavored as picking up / freeing.
//   Secure              — accrues hold time while a green is inside and no tan is.
//   Defend              — fails the objective if a tan soldier breaches it.
// Drop it in the level, set ObjectiveId to match a mission objective, pick the Mode.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ToyMissionTypes.h"
#include "ToyObjectiveVolume.generated.h"

class UBoxComponent;
class UToyMissionComponent;

UCLASS()
class TOYSOLDIER_API AToyObjectiveVolume : public AActor
{
	GENERATED_BODY()

public:
	AToyObjectiveVolume();

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Objective")
	FName ObjectiveId;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Objective")
	EObjectiveType Mode = EObjectiveType::ReachZone;

	/** Hold seconds credited per real second while securing (usually 1). */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Objective")
	float SecurePerSecond = 1.f;

protected:
	virtual void BeginPlay() override;
	virtual void Tick(float DeltaSeconds) override;

	UPROPERTY(VisibleAnywhere)
	TObjectPtr<UBoxComponent> Box;

	UFUNCTION()
	void OnBeginOverlap(UPrimitiveComponent* OverlappedComp, AActor* Other, UPrimitiveComponent* OtherComp,
		int32 BodyIndex, bool bFromSweep, const FHitResult& Sweep);
	UFUNCTION()
	void OnEndOverlap(UPrimitiveComponent* OverlappedComp, AActor* Other, UPrimitiveComponent* OtherComp,
		int32 BodyIndex);

private:
	int32 GreenInside = 0;
	int32 TanInside = 0;
	bool bFiredOnce = false;
	float SecureAccum = 0.f;

	UToyMissionComponent* GetMission() const;
};
