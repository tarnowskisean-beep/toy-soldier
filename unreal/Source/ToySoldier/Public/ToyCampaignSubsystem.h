// ToyCampaignSubsystem.h — campaign progression: which mission is current, unlocks,
// and save/load. A GameInstanceSubsystem so it survives traveling between levels.

#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "ToyCampaignSubsystem.generated.h"

class UToyCampaignData;
class UToyMissionData;

UCLASS()
class TOYSOLDIER_API UToyCampaignSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	/** Point this at your UToyCampaignData (e.g. from a GameInstance BP on startup). */
	UFUNCTION(BlueprintCallable, Category = "Campaign")
	void SetCampaign(UToyCampaignData* InCampaign);

	UFUNCTION(BlueprintCallable, Category = "Campaign")
	UToyMissionData* GetMission(int32 Index) const;

	UFUNCTION(BlueprintPure, Category = "Campaign")
	UToyMissionData* GetCurrentMission() const;

	UFUNCTION(BlueprintPure, Category = "Campaign")
	int32 GetCurrentIndex() const { return CurrentIndex; }

	UFUNCTION(BlueprintPure, Category = "Campaign")
	int32 NumMissions() const;

	UFUNCTION(BlueprintPure, Category = "Campaign")
	bool IsUnlocked(int32 Index) const { return Index <= UnlockedIndex; }

	/** Choose a mission to play next (from a level-select menu), then open its level. */
	UFUNCTION(BlueprintCallable, Category = "Campaign")
	void StartMission(int32 Index);

	/** Called by the GameMode when the current mission is won. Unlocks the next. */
	UFUNCTION(BlueprintCallable, Category = "Campaign")
	void MarkCurrentComplete(float CompletionTime);

	UFUNCTION(BlueprintCallable, Category = "Campaign")
	void SaveProgress();
	UFUNCTION(BlueprintCallable, Category = "Campaign")
	void LoadProgress();

private:
	UPROPERTY()
	TObjectPtr<UToyCampaignData> Campaign = nullptr;

	int32 CurrentIndex = 0;
	int32 UnlockedIndex = 0;

	static const TCHAR* SlotName() { return TEXT("ToyCampaign"); }
};
