// ToyHUDWidget.cpp — HUD readout updates + minimap projection.

#include "ToyHUDWidget.h"
#include "Components/TextBlock.h"

void UToyHUDWidget::UpdateObjective(const FText& Objective)
{
	if (ObjectiveText)
	{
		ObjectiveText->SetText(Objective);
	}
}

void UToyHUDWidget::UpdateWeapon(const FText& WeaponName, int32 Ammo, int32 AmmoReserve)
{
	if (WeaponText)
	{
		WeaponText->SetText(WeaponName);
	}
	if (AmmoText)
	{
		AmmoText->SetText(FText::FromString(FString::Printf(TEXT("%d / %d"), Ammo, AmmoReserve)));
	}
}

void UToyHUDWidget::SetWarning(const FText& Message, bool bVisible)
{
	if (WarningText)
	{
		WarningText->SetText(Message);
	}
	if (WarningRoot)
	{
		WarningRoot->SetVisibility(bVisible ? ESlateVisibility::HitTestInvisible : ESlateVisibility::Collapsed);
	}
}

void UToyHUDWidget::UpdateMissionHeader(const FText& Title, const FText& Subtitle)
{
	if (MissionTitleText)    MissionTitleText->SetText(Title);
	if (MissionSubtitleText) MissionSubtitleText->SetText(Subtitle);
}

FVector2D UToyHUDWidget::ProjectToMinimap(const FVector& WorldOffset, float CameraYawDeg, float RangeUU)
{
	if (RangeUU <= KINDA_SMALL_NUMBER)
	{
		return FVector2D::ZeroVector;
	}

	// Rotate the world offset by -yaw so the player's facing becomes "forward."
	const float Yaw = FMath::DegreesToRadians(CameraYawDeg);
	const float S = FMath::Sin(-Yaw);
	const float C = FMath::Cos(-Yaw);

	// UE world: +X forward, +Y right. After de-rotating:
	const float Forward = WorldOffset.X * C - WorldOffset.Y * S;
	const float Right   = WorldOffset.X * S + WorldOffset.Y * C;

	// Radar-local: +X right, +Y up. Forward maps to up.
	FVector2D Local(Right / RangeUU, Forward / RangeUU);

	// Clamp to the ring; callers can check the pre-clamp size for "out of range."
	if (Local.SizeSquared() > 1.f)
	{
		Local = Local.GetSafeNormal();
	}
	return Local;
}
