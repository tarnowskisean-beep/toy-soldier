// ToyEnemySpawner.h — spawns waves of tan soldiers (Defend/Survive missions, the
// finale, or alarm-triggered reinforcements). Every spawned enemy is registered with
// the mission so its death counts toward Eliminate objectives.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ToyHUDTypes.h"        // ESquadOrder
#include "ToyEnemySpawner.generated.h"

class AToySoldier;

DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnWavesComplete);

UCLASS()
class TOYSOLDIER_API AToyEnemySpawner : public AActor
{
	GENERATED_BODY()

public:
	AToyEnemySpawner();

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	TSubclassOf<AToySoldier> EnemyClass;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	int32 NumWaves = 3;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	int32 EnemiesPerWave = 4;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	float TimeBetweenWaves = 15.f;

	/** Enemies spawn within this radius of the spawner, on the floor. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	float SpawnRadius = 200.f;

	/** Never exceed this many living spawned enemies at once. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	int32 MaxAlive = 12;

	/** What order spawned enemies start with (Attack = hunt the squad). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	ESquadOrder SpawnOrder = ESquadOrder::Attack;

	/** Start spawning on BeginPlay; otherwise wait for StartWaves()/TriggerWave(). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Spawner")
	bool bAutoStart = true;

	UPROPERTY(BlueprintAssignable, Category = "Spawner")
	FOnWavesComplete OnWavesComplete;

	/** Begin the timed wave sequence. */
	UFUNCTION(BlueprintCallable, Category = "Spawner")
	void StartWaves();

	/** Spawn one wave immediately (e.g. an alarm-triggered reinforcement). */
	UFUNCTION(BlueprintCallable, Category = "Spawner")
	void TriggerWave();

protected:
	virtual void BeginPlay() override;

private:
	int32 WavesSpawned = 0;
	FTimerHandle WaveTimer;
	TArray<TWeakObjectPtr<AToySoldier>> Spawned;

	void NextWave();
	int32 CountAlive();
	AToySoldier* SpawnOne();
};
