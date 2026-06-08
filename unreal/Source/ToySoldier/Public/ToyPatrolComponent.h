// ToyPatrolComponent.h — walks a tan soldier along a loop of waypoints. Pauses while
// the soldier is engaged (Order == Attack, e.g. after a sentry spots you) and resumes
// the route once it calms down. Pairs naturally with UToyVisionComponent.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ToyPatrolComponent.generated.h"

class AToySoldier;

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UToyPatrolComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UToyPatrolComponent();

	/** Place empty actors (or Target Points) in the level and list them here, in order. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Patrol")
	TArray<TObjectPtr<AActor>> Waypoints;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Patrol")
	bool bLoop = true;

	/** How close counts as "arrived" at a waypoint. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Patrol")
	float ReachRadius = 120.f;

	virtual void TickComponent(float DeltaTime, ELevelTick TickType,
		FActorComponentTickFunction* ThisTickFunction) override;

private:
	int32 Index = 0;
	bool bForward = true;
	TWeakObjectPtr<AToySoldier> Owner;

	void Advance();
};
