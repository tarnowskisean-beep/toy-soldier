// ToyMissionTypes.h — the vocabulary of a mission: objective kinds + state.
//
// Missions are data: a list of objectives, each with a type and a required amount.
// The mission component tracks progress; objective actors in the level report it.

#pragma once

#include "CoreMinimal.h"
#include "ToyMissionTypes.generated.h"

/** What an objective asks the player to do. */
UENUM(BlueprintType)
enum class EObjectiveType : uint8
{
	Eliminate UMETA(DisplayName = "Eliminate N enemies"),
	ReachZone UMETA(DisplayName = "Reach a zone"),
	Secure    UMETA(DisplayName = "Hold a zone (timer)"),
	Defend    UMETA(DisplayName = "Defend a zone (fail if breached)"),
	Destroy   UMETA(DisplayName = "Destroy a target"),
	Collect   UMETA(DisplayName = "Collect an item"),
	Rescue    UMETA(DisplayName = "Rescue a hostage"),
	Survive   UMETA(DisplayName = "Survive for N seconds"),
	Extract   UMETA(DisplayName = "Reach extraction")
};

UENUM(BlueprintType)
enum class EObjectiveState : uint8
{
	Inactive,   // not yet unlocked (earlier objectives pending)
	Active,     // currently tracked
	Completed,
	Failed
};

/** One objective, authored on a UToyMissionData asset. */
USTRUCT(BlueprintType)
struct FMissionObjective
{
	GENERATED_BODY()

	/** Matches level actors (zones/targets/items tagged with this id) to this objective. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Objective")
	FName ObjectiveId;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Objective")
	EObjectiveType Type = EObjectiveType::Eliminate;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Objective")
	FText Description;

	/** Kills / seconds (Survive, Secure hold) / items — or 1 for reach/destroy/rescue. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Objective")
	int32 Required = 1;

	/** Optional objectives run in parallel and never block mission completion. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Objective")
	bool bOptional = false;
};

/** What the HUD draws for one objective line. */
USTRUCT(BlueprintType)
struct FObjectiveView
{
	GENERATED_BODY()

	UPROPERTY(BlueprintReadWrite, Category = "Objective")
	FText Description;

	UPROPERTY(BlueprintReadWrite, Category = "Objective")
	EObjectiveState State = EObjectiveState::Active;

	UPROPERTY(BlueprintReadWrite, Category = "Objective")
	int32 Progress = 0;

	UPROPERTY(BlueprintReadWrite, Category = "Objective")
	int32 Required = 1;

	UPROPERTY(BlueprintReadWrite, Category = "Objective")
	bool bOptional = false;
};
