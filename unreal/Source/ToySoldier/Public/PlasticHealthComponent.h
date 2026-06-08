// PlasticHealthComponent.h — Script 3: Plastic Fracture Damage System.
//
// Replaces blood/health-bars with damage that fits rigid hollow plastic: each hit
// stamps a jagged white stress-crack decal at the impact point, and when integrity
// hits zero the toy SHATTERS (Niagara shard burst) instead of ragdolling.
//
// Bind to point damage (which carries hit location/normal) rather than AnyDamage so
// we know exactly where to crack.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "PlasticHealthComponent.generated.h"

class AController;
class UDamageType;
class UMaterialInterface;
class UNiagaraSystem;
class UPrimitiveComponent;

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnPlasticShattered, AActor*, ShatteredActor);

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UPlasticHealthComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UPlasticHealthComponent();

	/** Structural integrity. At 0 the toy shatters (or just "downs" — see below). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic")
	float PlasticIntegrity = 100.f;

	/** Full integrity, used for percentage readouts and healing caps. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic")
	float MaxIntegrity = 100.f;

	/**
	 * If true, hitting 0 calls ShatterAndDie() (enemies / final death).
	 * Squad members set this FALSE so they go "downed" and can be revived by a
	 * medic instead of exploding into shards on first death.
	 */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic")
	bool bAutoShatterOnZero = true;

	/** Restore integrity (medic heal / revive), clamped to MaxIntegrity. */
	UFUNCTION(BlueprintCallable, Category = "Plastic")
	void Heal(float Amount);

	/** Integrity as a 0–100 percentage (for the HUD). */
	UFUNCTION(BlueprintPure, Category = "Plastic")
	float GetIntegrityPct() const;

	/** Decal material with a jagged white plastic stress-crack mask. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic|FX")
	TObjectPtr<UMaterialInterface> CrackDecalMaterial = nullptr;

	/** Half-size of each crack decal box (X = projection depth). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic|FX")
	FVector CrackDecalSize = FVector(4.f, 6.f, 6.f);

	/** Niagara burst of rigid green/tan plastic shards on death. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic|FX")
	TObjectPtr<UNiagaraSystem> ShatterFX = nullptr;

	/** Seconds to wait after shattering before destroying the actor. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Plastic")
	float DestroyDelay = 0.25f;

	/** Fires when this toy shatters (hook squad "man down", scoring, etc.). */
	UPROPERTY(BlueprintAssignable, Category = "Plastic")
	FOnPlasticShattered OnPlasticShattered;

	/** Read-only current integrity for HUD binding. */
	UFUNCTION(BlueprintPure, Category = "Plastic")
	float GetIntegrity() const { return PlasticIntegrity; }

protected:
	virtual void BeginPlay() override;

private:
	bool bShattered = false;

	UFUNCTION()
	void HandlePointDamage(AActor* DamagedActor, float Damage, AController* InstigatedBy,
		FVector HitLocation, UPrimitiveComponent* HitComponent, FName BoneName,
		FVector ShotDirection, const UDamageType* DamageType, AActor* DamageCauser);

	void SpawnCrackDecal(const FVector& Location, const FVector& Normal);
	void ShatterAndDie();
};
