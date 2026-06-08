// ToyGrenade.h — the Leader's frag grenade: an arcing projectile that explodes and
// deals falloff area damage to tan soldiers (their PlasticHealthComponent cracks them).

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ToyGrenade.generated.h"

class USphereComponent;
class UStaticMeshComponent;
class UProjectileMovementComponent;
class UNiagaraSystem;

UCLASS()
class TOYSOLDIER_API AToyGrenade : public AActor
{
	GENERATED_BODY()

public:
	AToyGrenade();

	/** Aim the throw so it lands near WorldTarget. */
	void LaunchToward(const FVector& WorldTarget);

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Grenade")
	float FuseSeconds = 2.2f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Grenade")
	float BlastRadius = 700.f;     // cm

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Grenade")
	float MaxDamage = 130.f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Grenade")
	float ThrowSpeed = 1200.f;     // cm/s baseline horizontal speed

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Grenade|FX")
	TObjectPtr<UNiagaraSystem> ExplosionFX = nullptr;

protected:
	virtual void BeginPlay() override;

	UPROPERTY(VisibleAnywhere) TObjectPtr<USphereComponent> Collision;
	UPROPERTY(VisibleAnywhere) TObjectPtr<UStaticMeshComponent> Mesh;
	UPROPERTY(VisibleAnywhere) TObjectPtr<UProjectileMovementComponent> Movement;

private:
	bool bExploded = false;
	FTimerHandle FuseHandle;

	UFUNCTION()
	void OnProjectileStop(const FHitResult& ImpactResult);

	void Explode();
};
