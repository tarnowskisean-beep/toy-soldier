// ToySoldier.h — one toy soldier. Possessable by the player, AI-driven otherwise.
//
// The UE port of soldier.js: same dual nature (you ARE this soldier when active, it's
// AI when not), same order states, same engage-with-line-of-sight behavior. Carries
// its own camera + macro lens (Script 1) and plastic health (Script 3) so possessing
// it just works.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "ToyHUDTypes.h"     // ESquadOrder
#include "ToyClassData.h"    // EToyTeam, EAbilityType, UToyClassData
#include "ToySoldier.generated.h"

class USpringArmComponent;
class UCineCameraComponent;
class UToyMacroCameraComponent;
class UPlasticHealthComponent;
class AToyGrenade;

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnSoldierDowned, AToySoldier*, Soldier);

UCLASS()
class TOYSOLDIER_API AToySoldier : public ACharacter
{
	GENERATED_BODY()

public:
	AToySoldier();
	virtual void Tick(float DeltaSeconds) override;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Toy")
	TObjectPtr<UToyClassData> ClassData = nullptr;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy")
	EToyTeam Team = EToyTeam::Green;

	// --- Order state (used while AI-controlled) ---
	UPROPERTY(BlueprintReadWrite, Category = "Toy|Order")
	ESquadOrder Order = ESquadOrder::Follow;

	UPROPERTY(BlueprintReadWrite, Category = "Toy|Order")
	FVector MoveGoal = FVector::ZeroVector;

	UPROPERTY(BlueprintReadWrite, Category = "Toy|Order")
	TObjectPtr<AActor> AttackTarget = nullptr;

	UPROPERTY(BlueprintReadWrite, Category = "Toy|Order")
	FVector FormationSlot = FVector::ZeroVector;

	UPROPERTY(BlueprintReadOnly, Category = "Toy")
	bool bPlayerControlled = false;

	UPROPERTY(BlueprintReadOnly, Category = "Toy")
	bool bDowned = false;

	/** Grenade actor the Leader throws (assign a BP_ToyGrenade subclass). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy|Ability")
	TSubclassOf<AToyGrenade> GrenadeClass;

	// --- Ammo ---
	UPROPERTY(BlueprintReadOnly, Category = "Toy")
	int32 Ammo = 30;

	UPROPERTY(BlueprintReadOnly, Category = "Toy")
	int32 AmmoReserve = 120;

	/** Fired when this soldier goes down (squad reacts: auto-switch, etc.). */
	UPROPERTY(BlueprintAssignable, Category = "Toy")
	FOnSoldierDowned OnSoldierDowned;

	// --- API used by the controller / squad ---
	void SetPlayerControlled(bool bIsPlayer);
	void TryFire(const FVector& AimPoint);            // player pulled the trigger
	void ActivateAbility(const FVector& AimPoint);    // Leader grenade (press abilities)
	void Revive(float Pct);

	/** Spend the ability cooldown if ready (used by squad revive). */
	bool TryConsumeAbility();

	// Hold abilities, set each frame by the controller from the aim button.
	void SetSuppressing(bool b) { bSuppressing = b; }   // Heavy
	void SetZoomed(bool b) { bZoomed = b; }             // Sniper
	UFUNCTION(BlueprintPure, Category = "Toy") bool IsSuppressing() const { return bSuppressing; }
	UFUNCTION(BlueprintPure, Category = "Toy") bool IsZoomed() const { return bZoomed; }

	/** Heavy suppress: pin tan soldiers in a forward cone so they stop firing. */
	void ApplySuppressionToEnemies();

	UFUNCTION(BlueprintPure, Category = "Toy") bool IsAlive() const { return !bDowned; }
	UFUNCTION(BlueprintPure, Category = "Toy") float GetIntegrityPct() const;
	UFUNCTION(BlueprintPure, Category = "Toy") float GetMoveSpeed() const;
	UFUNCTION(BlueprintPure, Category = "Toy") UCineCameraComponent* GetToyCamera() const { return Camera; }

	/** Hook for ability VFX/logic the designer wires up (grenade spawn, etc.). */
	UFUNCTION(BlueprintImplementableEvent, Category = "Toy")
	void OnAbilityActivated(EAbilityType AbilityType, FVector AimPoint);

	/** Fired on every shot — draw a tracer beam + muzzle flash in the BP. */
	UFUNCTION(BlueprintImplementableEvent, Category = "Toy")
	void OnWeaponFired(FVector MuzzleLocation, FVector ImpactLocation);

protected:
	virtual void BeginPlay() override;

	UPROPERTY(VisibleAnywhere, Category = "Toy")
	TObjectPtr<USpringArmComponent> SpringArm;

	UPROPERTY(VisibleAnywhere, Category = "Toy")
	TObjectPtr<UCineCameraComponent> Camera;

	UPROPERTY(VisibleAnywhere, Category = "Toy")
	TObjectPtr<UToyMacroCameraComponent> MacroLens;

	UPROPERTY(VisibleAnywhere, Category = "Toy")
	TObjectPtr<UPlasticHealthComponent> Health;

private:
	float FireCooldown = 0.f;
	float AbilityCooldown = 0.f;
	bool bSuppressing = false;   // Heavy ability active this frame
	bool bZoomed = false;        // Sniper ability active this frame
	float Suppressed = 0.f;      // pinned by enemy suppress fire → can't shoot

	float EffectiveFireInterval() const;
	float EffectiveSpreadDeg() const;

	void RunAIStep(float Dt);
	void FireBulletAt(const FVector& AimPoint, bool bConsumeAmmo);
	bool HasLineOfSight(const AActor* Target) const;
	AActor* FindEnemy(bool bRequireRangeAndLOS) const;
	void FaceDirection(const FVector& Dir, float Dt);
	void GoDown();
};
