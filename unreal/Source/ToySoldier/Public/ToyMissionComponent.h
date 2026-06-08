// ToyMissionComponent.h — runtime objective tracker (lives on the GameMode).
//
// Holds the live state of each objective, accepts progress reports from the level
// (objective actors call AddProgress), unlocks objectives in order, and decides when
// the mission is won or lost.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ToyMissionTypes.h"
#include "ToyMissionComponent.generated.h"

class UToyMissionData;

DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnObjectivesChanged);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnMissionEnded, bool, bSuccess);

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UToyMissionComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UToyMissionComponent();

	UPROPERTY(BlueprintAssignable, Category = "Mission")
	FOnObjectivesChanged OnObjectivesChanged;

	UPROPERTY(BlueprintAssignable, Category = "Mission")
	FOnMissionEnded OnMissionEnded;

	UFUNCTION(BlueprintCallable, Category = "Mission")
	void BeginMission(UToyMissionData* InMission);

	/** Report progress toward the active objective with this id (kills, items, etc.). */
	UFUNCTION(BlueprintCallable, Category = "Mission")
	void AddProgress(FName ObjectiveId, int32 Amount = 1);

	/** Find the id of the currently-active objective of a given type (-1 args helper). */
	UFUNCTION(BlueprintCallable, Category = "Mission")
	bool GetActiveObjectiveOfType(EObjectiveType Type, FName& OutId) const;

	UFUNCTION(BlueprintCallable, Category = "Mission")
	void FailMission();

	UFUNCTION(BlueprintCallable, Category = "Mission")
	void BuildViews(TArray<FObjectiveView>& OutViews) const;

	UFUNCTION(BlueprintPure, Category = "Mission")
	UToyMissionData* GetMission() const { return Mission; }

	virtual void TickComponent(float DeltaTime, ELevelTick TickType,
		FActorComponentTickFunction* ThisTickFunction) override;

private:
	// Internal live copy of each objective (no UObject refs, so plain struct is fine).
	struct FObjRuntime
	{
		FMissionObjective Def;
		EObjectiveState State = EObjectiveState::Inactive;
		int32 Progress = 0;
		float TimeAccum = 0.f;   // for Survive timers
	};

	UPROPERTY()
	TObjectPtr<UToyMissionData> Mission = nullptr;

	TArray<FObjRuntime> Objectives;
	bool bEnded = false;

	void ActivateNextMainObjective();
	void CompleteObjective(int32 Index);
	bool AllRequiredComplete() const;
	void EndMission(bool bSuccess);
};
