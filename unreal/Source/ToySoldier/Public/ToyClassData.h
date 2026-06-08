// ToyClassData.h — per-class stats as a Data Asset (the UE port of classes.js).
//
// Make one asset per class (DA_Leader, DA_Heavy, DA_Sniper, DA_Medic) in the editor
// and tune numbers there — no recompiling to rebalance.

#pragma once

#include "CoreMinimal.h"
#include "Engine/DataAsset.h"
#include "ToyHUDTypes.h"   // EToyClass
#include "ToyClassData.generated.h"

/** Which special the class fires with the ability input. */
UENUM(BlueprintType)
enum class EAbilityType : uint8
{
	None,
	Grenade,    // Leader — lob a frag (see grenades component, later)
	Suppress,   // Heavy — faster fire + pin enemies
	Scope,      // Sniper — zoom for precise one-shots
	Revive      // Medic — stand a downed mate back up
};

/** Green squad vs Tan enemy. AI targets the opposite team. */
UENUM(BlueprintType)
enum class EToyTeam : uint8
{
	Green,
	Tan
};

UCLASS(BlueprintType)
class TOYSOLDIER_API UToyClassData : public UDataAsset
{
	GENERATED_BODY()

public:
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Class")
	EToyClass ClassType = EToyClass::Leader;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Class")
	FString DisplayName = TEXT("LEADER");

	// --- Stats (centimeters / seconds; UE units) ---
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	float MaxIntegrity = 100.f;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	float MoveSpeed = 400.f;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	float FireInterval = 0.14f;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	float Damage = 16.f;

	/** Engagement range in cm (Sniper huge, Heavy/Medic short). */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	float EngageRange = 4000.f;

	/** Random aim cone half-angle, in degrees (Sniper tiny, Heavy wide). */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	float SpreadDegrees = 2.f;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	int32 MagazineSize = 30;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Stats")
	int32 ReserveAmmo = 120;

	// --- Ability ---
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Ability")
	EAbilityType Ability = EAbilityType::Grenade;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Ability")
	float AbilityCooldown = 3.5f;
};
