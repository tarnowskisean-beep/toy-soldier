// ToyCommandWheelWidget.h — the radial command/ability wheel.
//
// Hold a key to open it; nudge the mouse (or right stick) toward a segment to
// highlight it; release to issue that command to your squad. This is the
// "[ABLE 2: SUPPRESSIVE FIRE]" wheel from the reference, customized to our orders
// (Move / Attack / Hold / Regroup / Ability).
//
// The SELECTION MATH lives here in C++. The VISUALS (segment icons, highlight glow)
// are BlueprintImplementableEvents you build in the WBP child — so artists own the
// look and code owns the behavior.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "ToyHUDTypes.h"
#include "ToyCommandWheelWidget.generated.h"

UCLASS(Abstract)
class TOYSOLDIER_API UToyCommandWheelWidget : public UUserWidget
{
	GENERATED_BODY()

public:
	/** Commands arranged clockwise starting at the top (12 o'clock). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Command Wheel")
	TArray<EToyCommand> Segments;

	/** How far from center you must push before a segment is selected (0–1). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Command Wheel", meta = (ClampMin = "0.05", ClampMax = "0.95"))
	float DeadZone = 0.35f;

	/** Mouse-delta → selection scaling (relative input). */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Command Wheel")
	float MouseSensitivity = 0.02f;

	UToyCommandWheelWidget(const FObjectInitializer& ObjectInitializer);

	/** Show the wheel and reset selection. */
	UFUNCTION(BlueprintCallable, Category = "Command Wheel")
	void OpenWheel();

	/** Feed a relative mouse delta (call each frame while open). */
	UFUNCTION(BlueprintCallable, Category = "Command Wheel")
	void AddSelectionInput(FVector2D MouseDelta);

	/** Set selection from an absolute stick vector (-1..1 each axis). */
	UFUNCTION(BlueprintCallable, Category = "Command Wheel")
	void SetSelectionVector(FVector2D StickVector);

	/** Hide the wheel and return the highlighted command. */
	UFUNCTION(BlueprintCallable, Category = "Command Wheel")
	EToyCommand CloseAndPick();

	UFUNCTION(BlueprintPure, Category = "Command Wheel")
	int32 GetHighlightedIndex() const { return HighlightedIndex; }

	// --- Visuals implemented in the WBP child ---
	UFUNCTION(BlueprintImplementableEvent, Category = "Command Wheel")
	void OnWheelOpened();

	/** Index = highlighted segment (or -1 = none in the dead zone). */
	UFUNCTION(BlueprintImplementableEvent, Category = "Command Wheel")
	void OnHighlightChanged(int32 Index, EToyCommand Command);

	UFUNCTION(BlueprintImplementableEvent, Category = "Command Wheel")
	void OnWheelClosed(EToyCommand Picked);

protected:
	virtual void NativeConstruct() override;

private:
	FVector2D SelectionVector = FVector2D::ZeroVector;
	int32 HighlightedIndex = INDEX_NONE;

	void UpdateHighlight();
};
