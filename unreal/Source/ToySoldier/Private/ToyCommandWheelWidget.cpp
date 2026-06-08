// ToyCommandWheelWidget.cpp — radial selection logic.

#include "ToyCommandWheelWidget.h"

UToyCommandWheelWidget::UToyCommandWheelWidget(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	// Sensible default ring (clockwise from the top). Override per-WBP if you like.
	Segments = { EToyCommand::Move, EToyCommand::Attack, EToyCommand::Hold,
				 EToyCommand::Regroup, EToyCommand::Ability };
}

void UToyCommandWheelWidget::NativeConstruct()
{
	Super::NativeConstruct();
	SetVisibility(ESlateVisibility::Collapsed);   // hidden until opened
}

void UToyCommandWheelWidget::OpenWheel()
{
	SelectionVector = FVector2D::ZeroVector;
	HighlightedIndex = INDEX_NONE;
	SetVisibility(ESlateVisibility::HitTestInvisible);
	OnWheelOpened();
	OnHighlightChanged(INDEX_NONE, EToyCommand::None);
}

void UToyCommandWheelWidget::AddSelectionInput(FVector2D MouseDelta)
{
	SelectionVector += MouseDelta * MouseSensitivity;
	// Keep it inside the unit circle so it maps cleanly to an angle + magnitude.
	if (SelectionVector.SizeSquared() > 1.f)
	{
		SelectionVector = SelectionVector.GetSafeNormal();
	}
	UpdateHighlight();
}

void UToyCommandWheelWidget::SetSelectionVector(FVector2D StickVector)
{
	SelectionVector = (StickVector.SizeSquared() > 1.f) ? StickVector.GetSafeNormal() : StickVector;
	UpdateHighlight();
}

void UToyCommandWheelWidget::UpdateHighlight()
{
	int32 NewIndex = INDEX_NONE;

	if (SelectionVector.Size() >= DeadZone && Segments.Num() > 0)
	{
		// Angle measured from straight up (12 o'clock), increasing clockwise.
		// Screen space: +X is right, +Y is DOWN — so "up" is -Y.
		float Degrees = FMath::RadiansToDegrees(FMath::Atan2(SelectionVector.X, -SelectionVector.Y));
		if (Degrees < 0.f)
		{
			Degrees += 360.f;
		}
		const float SegmentArc = 360.f / Segments.Num();
		NewIndex = FMath::RoundToInt(Degrees / SegmentArc) % Segments.Num();
	}

	if (NewIndex != HighlightedIndex)
	{
		HighlightedIndex = NewIndex;
		const EToyCommand Cmd = Segments.IsValidIndex(NewIndex) ? Segments[NewIndex] : EToyCommand::None;
		OnHighlightChanged(NewIndex, Cmd);
	}
}

EToyCommand UToyCommandWheelWidget::CloseAndPick()
{
	const EToyCommand Picked = Segments.IsValidIndex(HighlightedIndex)
		? Segments[HighlightedIndex] : EToyCommand::None;
	SetVisibility(ESlateVisibility::Collapsed);
	OnWheelClosed(Picked);
	return Picked;
}
