// ToyMissionGameMode.cpp — mission wiring + result reporting.

#include "ToyMissionGameMode.h"
#include "ToyMissionComponent.h"
#include "ToyMissionData.h"
#include "ToyMissionTypes.h"
#include "ToySoldier.h"
#include "ToyCampaignSubsystem.h"
#include "EngineUtils.h"
#include "Engine/World.h"

AToyMissionGameMode::AToyMissionGameMode()
{
	PrimaryActorTick.bCanEverTick = true;
	MissionComp = CreateDefaultSubobject<UToyMissionComponent>(TEXT("MissionComp"));
}

void AToyMissionGameMode::BeginPlay()
{
	Super::BeginPlay();

	// Prefer the campaign's current mission; fall back to this level's default.
	UToyMissionData* Mission = DefaultMission;
	if (UGameInstance* GI = GetGameInstance())
	{
		if (UToyCampaignSubsystem* Campaign = GI->GetSubsystem<UToyCampaignSubsystem>())
		{
			if (UToyMissionData* Current = Campaign->GetCurrentMission())
			{
				Mission = Current;
			}
		}
	}

	BindExistingActors();

	if (MissionComp)
	{
		MissionComp->OnMissionEnded.AddDynamic(this, &AToyMissionGameMode::HandleMissionEnded);
		MissionComp->BeginMission(Mission);
	}
}

void AToyMissionGameMode::BindExistingActors()
{
	for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
	{
		It->OnSoldierDowned.AddDynamic(this, &AToyMissionGameMode::HandleSoldierDowned);
	}
}

void AToyMissionGameMode::RegisterEnemy(AToySoldier* Enemy)
{
	if (Enemy)
	{
		Enemy->OnSoldierDowned.AddDynamic(this, &AToyMissionGameMode::HandleSoldierDowned);
	}
}

void AToyMissionGameMode::HandleSoldierDowned(AToySoldier* Soldier)
{
	if (!Soldier || !MissionComp) return;

	if (Soldier->Team == EToyTeam::Tan)
	{
		// Credit the active Eliminate objective.
		FName Id;
		if (MissionComp->GetActiveObjectiveOfType(EObjectiveType::Eliminate, Id))
		{
			MissionComp->AddProgress(Id, 1);
		}
	}
	else
	{
		// A squad casualty — if the whole fireteam is down, the mission is lost.
		bool bAnyAlive = false;
		for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
		{
			if (It->Team == EToyTeam::Green && It->IsAlive()) { bAnyAlive = true; break; }
		}
		if (!bAnyAlive) MissionComp->FailMission();
	}
}

void AToyMissionGameMode::HandleMissionEnded(bool bSuccess)
{
	if (bSuccess)
	{
		if (UGameInstance* GI = GetGameInstance())
		{
			if (UToyCampaignSubsystem* Campaign = GI->GetSubsystem<UToyCampaignSubsystem>())
			{
				Campaign->MarkCurrentComplete(ElapsedTime);
			}
		}
	}
	OnMissionResult(bSuccess);   // BP shows the end screen / next-mission button
}

void AToyMissionGameMode::Tick(float DeltaSeconds)
{
	Super::Tick(DeltaSeconds);
	ElapsedTime += DeltaSeconds;
}
