// ToyEnemySpawner.cpp — timed/triggered wave spawning.

#include "ToyEnemySpawner.h"
#include "ToySoldier.h"
#include "ToyClassData.h"
#include "ToyMissionGameMode.h"
#include "Kismet/GameplayStatics.h"
#include "Engine/World.h"
#include "TimerManager.h"

AToyEnemySpawner::AToyEnemySpawner()
{
	PrimaryActorTick.bCanEverTick = false;
}

void AToyEnemySpawner::BeginPlay()
{
	Super::BeginPlay();
	if (bAutoStart) StartWaves();
}

void AToyEnemySpawner::StartWaves()
{
	WavesSpawned = 0;
	NextWave();   // first wave now, then on a timer
}

void AToyEnemySpawner::NextWave()
{
	if (WavesSpawned >= NumWaves)
	{
		OnWavesComplete.Broadcast();
		return;
	}
	TriggerWave();
	++WavesSpawned;

	// Schedule the next wave.
	if (WavesSpawned < NumWaves)
	{
		GetWorld()->GetTimerManager().SetTimer(
			WaveTimer, this, &AToyEnemySpawner::NextWave, TimeBetweenWaves, false);
	}
	else
	{
		OnWavesComplete.Broadcast();
	}
}

void AToyEnemySpawner::TriggerWave()
{
	if (!EnemyClass) return;
	for (int32 i = 0; i < EnemiesPerWave; ++i)
	{
		if (CountAlive() >= MaxAlive) break;   // respect the cap
		SpawnOne();
	}
}

int32 AToyEnemySpawner::CountAlive()
{
	int32 Alive = 0;
	for (int32 i = Spawned.Num() - 1; i >= 0; --i)
	{
		AToySoldier* S = Spawned[i].Get();
		if (!S) { Spawned.RemoveAtSwap(i); continue; }   // prune dead/destroyed
		if (S->IsAlive()) ++Alive;
	}
	return Alive;
}

AToySoldier* AToyEnemySpawner::SpawnOne()
{
	// A random spot in the radius; drop to the floor with a downward trace.
	const FVector2D Off = FMath::RandPointInCircle(SpawnRadius);
	FVector Loc = GetActorLocation() + FVector(Off.X, Off.Y, 50.f);

	FHitResult Ground;
	FCollisionQueryParams P(SCENE_QUERY_STAT(SpawnGround), false, this);
	if (GetWorld()->LineTraceSingleByChannel(Ground, Loc + FVector(0, 0, 200.f),
		Loc - FVector(0, 0, 400.f), ECC_Visibility, P))
	{
		Loc = Ground.ImpactPoint + FVector(0, 0, 5.f);
	}

	FActorSpawnParameters Params;
	Params.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AdjustIfPossibleButAlwaysSpawn;
	AToySoldier* Enemy = GetWorld()->SpawnActor<AToySoldier>(EnemyClass, Loc, GetActorRotation(), Params);
	if (!Enemy) return nullptr;

	Enemy->Team = EToyTeam::Tan;
	Enemy->Order = SpawnOrder;

	// Register with the mission so its death credits Eliminate objectives.
	if (AToyMissionGameMode* GM = Cast<AToyMissionGameMode>(UGameplayStatics::GetGameMode(this)))
	{
		GM->RegisterEnemy(Enemy);
	}

	Spawned.Add(Enemy);
	return Enemy;
}
