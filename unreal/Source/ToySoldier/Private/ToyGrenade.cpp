// ToyGrenade.cpp — arcing throw + area detonation.

#include "ToyGrenade.h"
#include "ToySoldier.h"
#include "Components/SphereComponent.h"
#include "Components/StaticMeshComponent.h"
#include "GameFramework/ProjectileMovementComponent.h"
#include "Kismet/GameplayStatics.h"
#include "NiagaraFunctionLibrary.h"
#include "EngineUtils.h"
#include "TimerManager.h"

AToyGrenade::AToyGrenade()
{
	Collision = CreateDefaultSubobject<USphereComponent>(TEXT("Collision"));
	Collision->InitSphereRadius(8.f);
	Collision->SetCollisionProfileName(TEXT("BlockAllDynamic"));
	RootComponent = Collision;

	Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
	Mesh->SetupAttachment(Collision);
	Mesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);

	Movement = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("Movement"));
	Movement->bShouldBounce = false;
	Movement->ProjectileGravityScale = 1.f;     // full gravity → a real arc
	Movement->InitialSpeed = 0.f;               // we set velocity in LaunchToward
}

void AToyGrenade::BeginPlay()
{
	Super::BeginPlay();
	Movement->OnProjectileStop.AddDynamic(this, &AToyGrenade::OnProjectileStop);
	GetWorld()->GetTimerManager().SetTimer(FuseHandle, this, &AToyGrenade::Explode, FuseSeconds, false);
}

void AToyGrenade::LaunchToward(const FVector& WorldTarget)
{
	const FVector Start = GetActorLocation();
	const FVector Delta = WorldTarget - Start;
	const float Horiz = FVector(Delta.X, Delta.Y, 0.f).Size();
	const float T = FMath::Max(0.3f, Horiz / ThrowSpeed);   // time of flight
	const float G = 980.f;                                  // UE gravity magnitude

	// Solve the vertical velocity that lands at the target height after time T.
	const float Vz = (Delta.Z + 0.5f * G * T * T) / T;
	const FVector Velocity(Delta.X / T, Delta.Y / T, Vz);

	Movement->Velocity = Velocity;
}

void AToyGrenade::OnProjectileStop(const FHitResult& /*ImpactResult*/)
{
	Explode();   // detonate on first solid contact (or when the fuse runs out)
}

void AToyGrenade::Explode()
{
	if (bExploded) return;
	bExploded = true;

	const FVector Center = GetActorLocation();

	// Area damage to tan soldiers, falling off with distance.
	for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
	{
		AToySoldier* S = *It;
		if (S->Team != EToyTeam::Tan || !S->IsAlive()) continue;

		const float Dist = FVector::Dist(S->GetActorLocation(), Center);
		if (Dist > BlastRadius) continue;

		const float Dmg = MaxDamage * (1.f - Dist / BlastRadius);
		const FVector Dir = (S->GetActorLocation() - Center).GetSafeNormal();
		FHitResult Hit;
		Hit.ImpactPoint = S->GetActorLocation();
		UGameplayStatics::ApplyPointDamage(S, Dmg, Dir, Hit,
			GetInstigatorController(), this, UDamageType::StaticClass());
	}

	if (ExplosionFX)
	{
		UNiagaraFunctionLibrary::SpawnSystemAtLocation(GetWorld(), ExplosionFX, Center);
	}
	Destroy();
}
