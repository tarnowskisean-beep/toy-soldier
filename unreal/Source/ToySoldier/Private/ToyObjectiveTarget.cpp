// ToyObjectiveTarget.cpp — destructible target → Destroy objective.

#include "ToyObjectiveTarget.h"
#include "ToyMissionGameMode.h"
#include "ToyMissionComponent.h"
#include "PlasticHealthComponent.h"
#include "Components/StaticMeshComponent.h"
#include "Kismet/GameplayStatics.h"

AToyObjectiveTarget::AToyObjectiveTarget()
{
	Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
	RootComponent = Mesh;

	Health = CreateDefaultSubobject<UPlasticHealthComponent>(TEXT("Health"));
	Health->bAutoShatterOnZero = true;     // targets blow up (they aren't revivable)
	Health->MaxIntegrity = 300.f;          // tougher than a soldier
	Health->PlasticIntegrity = 300.f;
}

void AToyObjectiveTarget::BeginPlay()
{
	Super::BeginPlay();
	if (Health)
	{
		Health->OnPlasticShattered.AddDynamic(this, &AToyObjectiveTarget::HandleShattered);
	}
}

void AToyObjectiveTarget::HandleShattered(AActor* /*ShatteredActor*/)
{
	if (AToyMissionGameMode* GM = Cast<AToyMissionGameMode>(UGameplayStatics::GetGameMode(this)))
	{
		if (UToyMissionComponent* M = GM->GetMissionComponent())
		{
			M->AddProgress(ObjectiveId, 1000000);   // a target is one-and-done
		}
	}
}
