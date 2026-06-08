// ToyHUDWidget.h — the main tactical HUD overlay.
//
// Holds the always-on readouts (objective, ammo, weapon, incoming-fire warning) as
// bound text, and exposes events for the dynamic lists (squad cards, minimap blips)
// that the WBP builds visually. Gameplay calls the Update* functions each frame.
//
// Reference mapping:
//   ObjectiveText  → "OBJECTIVE: SECURE ARTILLERY OUTPOST (THE COFFEE TABLE)"
//   WeaponText     → "M4A1 PLASTIC OVERMOLD (SUPPRESSED)"
//   AmmoText       → "30 / 120"
//   WarningRoot    → "WARNING: INCOMING FIRE // CRITICAL INTEGRITY"
//   UpdateSquad    → the [ABLE 1] / [ABLE 2] integrity panel
//   UpdateMinimap  → the compass radar's green/tan dots

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "ToyHUDTypes.h"
#include "ToyMissionTypes.h"
#include "ToyHUDWidget.generated.h"

class UTextBlock;

UCLASS(Abstract)
class TOYSOLDIER_API UToyHUDWidget : public UUserWidget
{
	GENERATED_BODY()

public:
	UFUNCTION(BlueprintCallable, Category = "Toy HUD")
	void UpdateObjective(const FText& Objective);

	UFUNCTION(BlueprintCallable, Category = "Toy HUD")
	void UpdateWeapon(const FText& WeaponName, int32 Ammo, int32 AmmoReserve);

	UFUNCTION(BlueprintCallable, Category = "Toy HUD")
	void SetWarning(const FText& Message, bool bVisible);

	/** Mission name + sector line, shown in the objective banner. */
	UFUNCTION(BlueprintCallable, Category = "Toy HUD")
	void UpdateMissionHeader(const FText& Title, const FText& Subtitle);

	/** Redraw the objective checklist. Build the visuals (lines + check marks) in WBP. */
	UFUNCTION(BlueprintImplementableEvent, Category = "Toy HUD")
	void UpdateObjectives(const TArray<FObjectiveView>& Objectives);

	/** Show the win/lose end card. */
	UFUNCTION(BlueprintImplementableEvent, Category = "Toy HUD")
	void ShowMissionResult(bool bSuccess);

	/** Rebuild the squad panel. Implement the visuals (spawn/fill cards) in the WBP. */
	UFUNCTION(BlueprintImplementableEvent, Category = "Toy HUD")
	void UpdateSquad(const TArray<FSquadMemberView>& Members);

	/** Reposition the radar dots. Implement the visuals (move blip images) in the WBP. */
	UFUNCTION(BlueprintImplementableEvent, Category = "Toy HUD")
	void UpdateMinimap(const TArray<FMinimapBlip>& Blips);

	/**
	 * Project a world-space offset (target − player) into radar-local space, with the
	 * player's forward pointing "up." Each axis comes back in [-1, 1]; magnitude > 1
	 * means out of range (clamp to the ring or hide it). Handy when building the blip
	 * list to pass into UpdateMinimap.
	 *
	 * @param WorldOffset   Target location minus player location (Z ignored).
	 * @param CameraYawDeg  The player/camera yaw in degrees (rotation about Z).
	 * @param RangeUU       Radar range in Unreal units (cm) mapped to the ring edge.
	 */
	UFUNCTION(BlueprintPure, Category = "Toy HUD")
	static FVector2D ProjectToMinimap(const FVector& WorldOffset, float CameraYawDeg, float RangeUU);

protected:
	// These names must match the widgets you create in the WBP.
	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> ObjectiveText = nullptr;

	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> MissionTitleText = nullptr;

	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> MissionSubtitleText = nullptr;

	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UTextBlock> WeaponText = nullptr;

	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UTextBlock> AmmoText = nullptr;

	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> WarningText = nullptr;

	// The container to show/hide for the warning banner (a Border/panel).
	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UWidget> WarningRoot = nullptr;
};
