// ToyMissionData.h — a mission and the campaign that orders them, as Data Assets.

#pragma once

#include "CoreMinimal.h"
#include "Engine/DataAsset.h"
#include "ToyMissionTypes.h"
#include "ToyMissionData.generated.h"

/** One mission: its level, briefing, and ordered objectives. */
UCLASS(BlueprintType)
class TOYSOLDIER_API UToyMissionData : public UPrimaryDataAsset
{
	GENERATED_BODY()

public:
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission")
	FName MissionId;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission")
	FText Title;

	/** e.g. "SECTOR: LIVING ROOM FLOOR" */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission")
	FText Subtitle;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission", meta = (MultiLine = true))
	FText Briefing;

	/** Played top-to-bottom: each non-optional objective unlocks when the prior completes. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission")
	TArray<FMissionObjective> Objectives;

	/** The map this mission loads. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission")
	TSoftObjectPtr<UWorld> Level;

	/** Target completion time for the medal/bonus (seconds). */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Mission")
	float ParTimeSeconds = 300.f;
};

/** The ordered list of missions = the campaign. */
UCLASS(BlueprintType)
class TOYSOLDIER_API UToyCampaignData : public UPrimaryDataAsset
{
	GENERATED_BODY()

public:
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Campaign")
	TArray<TObjectPtr<UToyMissionData>> Missions;
};
