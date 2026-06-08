// ToyPlayerController.h — input, squad switching, command wheel, HUD driver.
//
// The UE port of the prototype's main.js: owns the squad, reads input, routes the
// command wheel to squad orders, and feeds the HUD every frame.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerController.h"
#include "ToyPlayerController.generated.h"

class UToySquadComponent;
class UToyHUDWidget;
class UToyCommandWheelWidget;
class UInputMappingContext;
class UInputAction;
struct FInputActionValue;

UCLASS()
class TOYSOLDIER_API AToyPlayerController : public APlayerController
{
	GENERATED_BODY()

public:
	AToyPlayerController();

	UPROPERTY(VisibleAnywhere, Category = "Squad")
	TObjectPtr<UToySquadComponent> Squad;

	// --- Enhanced Input assets (assign these in a BP subclass) ---
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputMappingContext> MappingContext;

	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Move;
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Look;
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Fire;
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Ability;
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Aim;          // hold: Heavy suppress / Sniper scope
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Wheel;       // hold to open the command wheel
	UPROPERTY(EditAnywhere, Category = "Input")
	TObjectPtr<UInputAction> IA_Cycle;        // Tab — next squadmate
	UPROPERTY(EditAnywhere, Category = "Input")
	TArray<TObjectPtr<UInputAction>> IA_Select; // four actions for keys 1–4

	// --- HUD widget classes (assign your WBPs) ---
	UPROPERTY(EditAnywhere, Category = "HUD")
	TSubclassOf<UToyHUDWidget> HUDWidgetClass;
	UPROPERTY(EditAnywhere, Category = "HUD")
	TSubclassOf<UToyCommandWheelWidget> WheelWidgetClass;

	UPROPERTY(EditAnywhere, Category = "HUD")
	float MinimapRangeUU = 4000.f;

	// Sniper scope: cine-camera focal length lerps between these (mm).
	UPROPERTY(EditAnywhere, Category = "Scope")
	float DefaultFocalLength = 35.f;
	UPROPERTY(EditAnywhere, Category = "Scope")
	float ZoomFocalLength = 105.f;
	UPROPERTY(EditAnywhere, Category = "Scope")
	float ZoomLookScale = 0.4f;     // slower aim while scoped

protected:
	virtual void BeginPlay() override;
	virtual void SetupInputComponent() override;
	virtual void PlayerTick(float DeltaTime) override;

private:
	UPROPERTY() TObjectPtr<UToyHUDWidget> HUD;
	UPROPERTY() TObjectPtr<UToyCommandWheelWidget> Wheel;
	bool bWheelOpen = false;
	bool bAimHeld = false;
	float CurrentFocalLength = 35.f;

	// Input handlers
	void OnMove(const FInputActionValue& Value);
	void OnLook(const FInputActionValue& Value);
	void OnFire(const FInputActionValue& Value);
	void OnAbility(const FInputActionValue& Value);
	void OnWheelStarted(const FInputActionValue& Value);
	void OnWheelReleased(const FInputActionValue& Value);
	void OnAimStarted(const FInputActionValue& Value);
	void OnAimReleased(const FInputActionValue& Value);
	void OnCycle(const FInputActionValue& Value);
	void OnSelect1(); void OnSelect2(); void OnSelect3(); void OnSelect4();

	// Helpers
	bool GetAim(FVector& OutPoint, AActor*& OutTarget) const;
	void UpdateHUD();
};
