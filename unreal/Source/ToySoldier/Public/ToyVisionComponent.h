// ToyVisionComponent.h — sentry eyes. Put it on a tan soldier: it sweeps a vision
// cone for green soldiers, needs a moment of continuous sight to "spot" them (so
// stealth has a grace window), then alerts its owner and raises the alarm.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ToyVisionComponent.generated.h"

class AToySoldier;

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnTargetSpotted, AToySoldier*, Target);

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UToyVisionComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UToyVisionComponent();

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Vision")
	float ViewDistance = 2500.f;

	/** Half-angle of the cone, in degrees. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Vision")
	float ViewHalfAngleDeg = 45.f;

	/** Seconds of continuous sight needed to fully spot a target. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Vision")
	float TimeToDetect = 0.8f;

	/** Seconds of no contact before the sentry calms down again. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Vision")
	float ForgetTime = 4.f;

	/** 0–1 how aware the sentry currently is (for a UI "?" / "!" indicator). */
	UPROPERTY(BlueprintReadOnly, Category = "Vision")
	float Awareness = 0.f;

	/** Raised once when a target is fully spotted. Wire this to a wave spawner. */
	UPROPERTY(BlueprintAssignable, Category = "Vision")
	FOnTargetSpotted OnTargetSpotted;

	virtual void TickComponent(float DeltaTime, ELevelTick TickType,
		FActorComponentTickFunction* ThisTickFunction) override;

private:
	bool bAlerted = false;
	float TimeSinceSeen = 0.f;
	TWeakObjectPtr<AToySoldier> Owner;

	AToySoldier* FindVisibleGreen() const;
	void Spot(AToySoldier* Target);
	void Calm();
};
