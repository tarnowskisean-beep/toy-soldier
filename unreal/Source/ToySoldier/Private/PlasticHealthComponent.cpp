// PlasticHealthComponent.cpp — Script 3 implementation.

#include "PlasticHealthComponent.h"

#include "GameFramework/Actor.h"
#include "GameFramework/Character.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "Components/SkeletalMeshComponent.h"
#include "Components/DecalComponent.h"
#include "Kismet/GameplayStatics.h"
#include "NiagaraFunctionLibrary.h"
#include "Engine/World.h"

UPlasticHealthComponent::UPlasticHealthComponent()
{
	PrimaryComponentTick.bCanEverTick = false;   // purely event-driven
}

void UPlasticHealthComponent::BeginPlay()
{
	Super::BeginPlay();

	// Point damage gives us HitLocation + ShotDirection (AnyDamage does not).
	// Shooters must use UGameplayStatics::ApplyPointDamage for this to fire.
	if (AActor* Owner = GetOwner())
	{
		Owner->OnTakePointDamage.AddDynamic(this, &UPlasticHealthComponent::HandlePointDamage);
	}
}

void UPlasticHealthComponent::HandlePointDamage(AActor* DamagedActor, float Damage, AController* InstigatedBy,
	FVector HitLocation, UPrimitiveComponent* HitComponent, FName BoneName,
	FVector ShotDirection, const UDamageType* DamageType, AActor* DamageCauser)
{
	if (bShattered || Damage <= 0.f)
	{
		return;
	}

	// Stamp a stress crack at the impact. The bullet travels along ShotDirection,
	// so the crack faces roughly the reverse (back toward the shooter).
	SpawnCrackDecal(HitLocation, -ShotDirection.GetSafeNormal());

	PlasticIntegrity -= Damage;
	if (PlasticIntegrity <= 0.f && bAutoShatterOnZero)
	{
		ShatterAndDie();
	}
	// When bAutoShatterOnZero is false, the owning soldier polls GetIntegrityPct()
	// and handles its own "downed" (revivable) state instead.
}

void UPlasticHealthComponent::Heal(float Amount)
{
	if (bShattered || Amount <= 0.f)
	{
		return;
	}
	PlasticIntegrity = FMath::Min(PlasticIntegrity + Amount, MaxIntegrity);
}

float UPlasticHealthComponent::GetIntegrityPct() const
{
	return (MaxIntegrity > 0.f) ? (PlasticIntegrity / MaxIntegrity) * 100.f : 0.f;
}

void UPlasticHealthComponent::SpawnCrackDecal(const FVector& Location, const FVector& Normal)
{
	if (!CrackDecalMaterial)
	{
		return;
	}

	// Attach cracks to the skeletal mesh so they ride along with animation.
	USceneComponent* Attach = GetOwner()->GetRootComponent();
	if (const ACharacter* Ch = Cast<ACharacter>(GetOwner()))
	{
		if (USkeletalMeshComponent* Mesh = Ch->GetMesh())
		{
			Attach = Mesh;
		}
	}

	const FRotator DecalRot = Normal.Rotation();
	UGameplayStatics::SpawnDecalAttached(
		CrackDecalMaterial, CrackDecalSize, Attach, NAME_None, Location, DecalRot,
		EAttachLocation::KeepWorldPosition, /*LifeSpan=*/0.f /* 0 = permanent */);
}

void UPlasticHealthComponent::ShatterAndDie()
{
	bShattered = true;

	AActor* Owner = GetOwner();
	if (!Owner)
	{
		return;
	}

	Owner->SetActorEnableCollision(false);

	if (ACharacter* Ch = Cast<ACharacter>(Owner))
	{
		if (USkeletalMeshComponent* Mesh = Ch->GetMesh())
		{
			Mesh->bPauseAnims = true;             // freeze the pose — plastic doesn't flop
			Mesh->SetVisibility(false);           // hide the body; the shards take over
		}
		if (UCharacterMovementComponent* Move = Ch->GetCharacterMovement())
		{
			Move->DisableMovement();
		}
	}

	// Burst of rigid hollow-plastic shards.
	if (ShatterFX)
	{
		UNiagaraFunctionLibrary::SpawnSystemAtLocation(
			GetWorld(), ShatterFX, Owner->GetActorLocation(), Owner->GetActorRotation());
	}

	OnPlasticShattered.Broadcast(Owner);   // let the squad/score systems react
	Owner->SetLifeSpan(DestroyDelay);      // clean up after the burst
}
