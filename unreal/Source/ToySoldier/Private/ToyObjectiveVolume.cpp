// ToyObjectiveVolume.cpp — spatial objective reporting.

#include "ToyObjectiveVolume.h"
#include "ToyMissionGameMode.h"
#include "ToyMissionComponent.h"
#include "ToySoldier.h"
#include "Components/BoxComponent.h"
#include "Kismet/GameplayStatics.h"

AToyObjectiveVolume::AToyObjectiveVolume()
{
	PrimaryActorTick.bCanEverTick = true;
	PrimaryActorTick.TickInterval = 0.2f;

	Box = CreateDefaultSubobject<UBoxComponent>(TEXT("Box"));
	Box->SetBoxExtent(FVector(150.f));
	Box->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
	RootComponent = Box;
}

void AToyObjectiveVolume::BeginPlay()
{
	Super::BeginPlay();
	Box->OnComponentBeginOverlap.AddDynamic(this, &AToyObjectiveVolume::OnBeginOverlap);
	Box->OnComponentEndOverlap.AddDynamic(this, &AToyObjectiveVolume::OnEndOverlap);
	SetActorTickEnabled(Mode == EObjectiveType::Secure);  // only Secure needs ticking
}

UToyMissionComponent* AToyObjectiveVolume::GetMission() const
{
	if (AToyMissionGameMode* GM = Cast<AToyMissionGameMode>(UGameplayStatics::GetGameMode(this)))
	{
		return GM->GetMissionComponent();
	}
	return nullptr;
}

void AToyObjectiveVolume::OnBeginOverlap(UPrimitiveComponent*, AActor* Other, UPrimitiveComponent*,
	int32, bool, const FHitResult&)
{
	AToySoldier* S = Cast<AToySoldier>(Other);
	if (!S || !S->IsAlive()) return;

	if (S->Team == EToyTeam::Green) ++GreenInside;
	else ++TanInside;

	UToyMissionComponent* M = GetMission();
	if (!M) return;

	switch (Mode)
	{
	case EObjectiveType::ReachZone:
	case EObjectiveType::Extract:
	case EObjectiveType::Collect:
	case EObjectiveType::Rescue:
		// First green to arrive completes it.
		if (S->Team == EToyTeam::Green && !bFiredOnce)
		{
			bFiredOnce = true;
			M->AddProgress(ObjectiveId, /*complete*/ 1000000);
		}
		break;

	case EObjectiveType::Defend:
		// A tan breach fails the mission.
		if (S->Team == EToyTeam::Tan) M->FailMission();
		break;

	default:
		break;
	}
}

void AToyObjectiveVolume::OnEndOverlap(UPrimitiveComponent*, AActor* Other, UPrimitiveComponent*, int32)
{
	AToySoldier* S = Cast<AToySoldier>(Other);
	if (!S) return;
	if (S->Team == EToyTeam::Green) GreenInside = FMath::Max(0, GreenInside - 1);
	else TanInside = FMath::Max(0, TanInside - 1);
}

void AToyObjectiveVolume::Tick(float DeltaSeconds)
{
	Super::Tick(DeltaSeconds);
	if (Mode != EObjectiveType::Secure || bFiredOnce) return;

	// Hold the zone: a green present, no tan contesting.
	if (GreenInside > 0 && TanInside == 0)
	{
		SecureAccum += DeltaSeconds * SecurePerSecond;
		if (UToyMissionComponent* M = GetMission())
		{
			// Credit whole seconds of hold as they accrue.
			const int32 Whole = (int32)SecureAccum;
			if (Whole > 0)
			{
				SecureAccum -= Whole;
				M->AddProgress(ObjectiveId, Whole);
			}
		}
	}
}
