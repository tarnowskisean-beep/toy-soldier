// ToySquadComponent.h — the fireteam command layer (UE port of squad.js).
//
// Lives on the player controller. Tracks the 4 soldiers, which one you're possessing,
// turns wheel commands into per-soldier orders, holds formation behind the active
// soldier, runs the medic heal, and produces the HUD's squad view data.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ToyHUDTypes.h"
#include "ToySquadComponent.generated.h"

class AToySoldier;

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UToySquadComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UToySquadComponent();

	/** The four soldiers, in 1–4 order. Set in the level or spawned at start. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Squad")
	TArray<TObjectPtr<AToySoldier>> Members;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Squad")
	float FormationSpacing = 220.f;   // cm between formation slots

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Squad")
	float MedicHealRate = 9.f;        // integrity/sec to nearby squadmates

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Squad")
	float MedicRange = 500.f;

	virtual void TickComponent(float DeltaTime, ELevelTick TickType,
		FActorComponentTickFunction* ThisTickFunction) override;

	UFUNCTION(BlueprintCallable, Category = "Squad")
	void InitializeSquad();           // possess slot 0, set the rest to Follow

	UFUNCTION(BlueprintCallable, Category = "Squad")
	AToySoldier* GetActive() const;

	UFUNCTION(BlueprintCallable, Category = "Squad")
	void SelectMember(int32 Index);      // take control of member [Index]

	UFUNCTION(BlueprintCallable, Category = "Squad")
	void CycleNext();

	/**
	 * Route a wheel command to the OTHER squadmates (or trigger the active soldier's
	 * ability). AimPoint = world point under the crosshair; AimTarget = the enemy
	 * under it, if any.
	 */
	UFUNCTION(BlueprintCallable, Category = "Squad")
	void IssueCommand(EToyCommand Command, const FVector& AimPoint, AActor* AimTarget);

	UFUNCTION(BlueprintCallable, Category = "Squad")
	bool IsSquadAlive() const;

	/** Build the per-member data the HUD draws. */
	UFUNCTION(BlueprintCallable, Category = "Squad")
	void BuildHudViews(TArray<FSquadMemberView>& OutViews) const;

private:
	int32 ActiveIndex = 0;

	void ReviveNearbyDowned(AToySoldier* Medic);
	void UpdateFormation();
	void MedicHeal(float Dt);
	int32 FirstAliveIndex() const;
};
