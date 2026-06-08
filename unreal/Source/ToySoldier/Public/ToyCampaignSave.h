// ToyCampaignSave.h — what we persist between play sessions.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/SaveGame.h"
#include "ToyCampaignSave.generated.h"

UCLASS()
class TOYSOLDIER_API UToyCampaignSave : public USaveGame
{
	GENERATED_BODY()

public:
	/** Highest mission index the player has unlocked (0 = only the first). */
	UPROPERTY()
	int32 UnlockedIndex = 0;

	/** MissionId → best completion time (seconds) for medals. */
	UPROPERTY()
	TMap<FName, float> BestTimes;
};
