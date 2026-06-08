// ToyHUDTypes.h — shared enums + structs for the tactical HUD.
//
// Gameplay code fills these in and hands them to the HUD widget; the widget only
// knows how to *display* them. This separation (data vs. presentation) is the same
// idea as the prototype's hud.js reading from squad state — it keeps the UI swappable.

#pragma once

#include "CoreMinimal.h"
#include "ToyHUDTypes.generated.h"

/** The four squad roles (mirrors classes.js in the prototype). */
UENUM(BlueprintType)
enum class EToyClass : uint8
{
	Leader UMETA(DisplayName = "Leader"),
	Heavy  UMETA(DisplayName = "Heavy"),
	Sniper UMETA(DisplayName = "Sniper"),
	Medic  UMETA(DisplayName = "Medic")
};

/** Standing order for an AI squadmate (mirrors soldier.js ORDER). */
UENUM(BlueprintType)
enum class ESquadOrder : uint8
{
	Follow UMETA(DisplayName = "Follow"),
	Hold   UMETA(DisplayName = "Hold"),
	Move   UMETA(DisplayName = "Move"),
	Attack UMETA(DisplayName = "Attack")
};

/** Commands the radial wheel can issue. ABILITY triggers the active class's special. */
UENUM(BlueprintType)
enum class EToyCommand : uint8
{
	None    UMETA(DisplayName = "None"),
	Move    UMETA(DisplayName = "Move Here"),
	Attack  UMETA(DisplayName = "Attack Target"),
	Hold    UMETA(DisplayName = "Hold Position"),
	Regroup UMETA(DisplayName = "Regroup / Follow"),
	Ability UMETA(DisplayName = "Class Ability")
};

/** One soldier's worth of data for the squad panel (bottom-left in the refs). */
USTRUCT(BlueprintType)
struct FSquadMemberView
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	EToyClass ClassType = EToyClass::Leader;

	/** Tactical callsign, e.g. "ABLE-1". */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	FString Callsign;

	/** Plastic integrity 0–100 (drives the "INTEGRITY %" readout + bar). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	float IntegrityPct = 100.f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	int32 Ammo = 30;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	int32 AmmoReserve = 120;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	ESquadOrder Order = ESquadOrder::Follow;

	/** True for the soldier the player is currently possessing ("YOU" / PLAYER). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	bool bPlayerControlled = false;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	bool bDowned = false;

	/** Empty, or a body part like "LEFT ARM" for the "FRACTURE WARNING" line. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	FString FractureWarning;
};

/** A single dot on the compass minimap, already projected to radar-local space. */
USTRUCT(BlueprintType)
struct FMinimapBlip
{
	GENERATED_BODY()

	/** Position inside the radar, each axis in [-1, 1]; (0,0) is the center. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	FVector2D Local = FVector2D::ZeroVector;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	bool bEnemy = false;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toy HUD")
	bool bPlayer = false;
};
