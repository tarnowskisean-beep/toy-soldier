// ToyObjectiveTarget.h — a destructible mission target (the tan artillery, a battery
// depot, etc.). Uses the plastic-health component so it cracks and shatters when shot,
// then reports a Destroy objective complete.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ToyObjectiveTarget.generated.h"

class UStaticMeshComponent;
class UPlasticHealthComponent;

UCLASS()
class TOYSOLDIER_API AToyObjectiveTarget : public AActor
{
	GENERATED_BODY()

public:
	AToyObjectiveTarget();

	/** Matches the Destroy objective in the mission. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Objective")
	FName ObjectiveId;

protected:
	virtual void BeginPlay() override;

	UPROPERTY(VisibleAnywhere)
	TObjectPtr<UStaticMeshComponent> Mesh;

	UPROPERTY(VisibleAnywhere)
	TObjectPtr<UPlasticHealthComponent> Health;

private:
	UFUNCTION()
	void HandleShattered(AActor* ShatteredActor);
};
