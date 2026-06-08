// ToyCampaignSubsystem.cpp — progression + save/load.

#include "ToyCampaignSubsystem.h"
#include "ToyCampaignSave.h"
#include "ToyMissionData.h"
#include "Kismet/GameplayStatics.h"

void UToyCampaignSubsystem::SetCampaign(UToyCampaignData* InCampaign)
{
	Campaign = InCampaign;
	LoadProgress();
}

int32 UToyCampaignSubsystem::NumMissions() const
{
	return Campaign ? Campaign->Missions.Num() : 0;
}

UToyMissionData* UToyCampaignSubsystem::GetMission(int32 Index) const
{
	return (Campaign && Campaign->Missions.IsValidIndex(Index)) ? Campaign->Missions[Index] : nullptr;
}

UToyMissionData* UToyCampaignSubsystem::GetCurrentMission() const
{
	return GetMission(CurrentIndex);
}

void UToyCampaignSubsystem::StartMission(int32 Index)
{
	if (!IsUnlocked(Index)) return;
	UToyMissionData* Mission = GetMission(Index);
	if (!Mission) return;

	CurrentIndex = Index;
	// Open the mission's level; the GameMode there reads GetCurrentMission().
	const FString LevelName = Mission->Level.GetLongPackageName();
	if (!LevelName.IsEmpty())
	{
		UGameplayStatics::OpenLevel(this, FName(*LevelName));
	}
}

void UToyCampaignSubsystem::MarkCurrentComplete(float CompletionTime)
{
	UToyMissionData* Mission = GetCurrentMission();
	if (!Mission) return;

	// Unlock the next mission.
	UnlockedIndex = FMath::Max(UnlockedIndex, FMath::Min(CurrentIndex + 1, NumMissions() - 1));

	// Record best time.
	UToyCampaignSave* Save = Cast<UToyCampaignSave>(
		UGameplayStatics::LoadGameFromSlot(SlotName(), 0));
	if (!Save) Save = Cast<UToyCampaignSave>(UGameplayStatics::CreateSaveGameObject(UToyCampaignSave::StaticClass()));

	float& Best = Save->BestTimes.FindOrAdd(Mission->MissionId);
	if (Best <= 0.f || CompletionTime < Best) Best = CompletionTime;
	Save->UnlockedIndex = UnlockedIndex;

	UGameplayStatics::SaveGameToSlot(Save, SlotName(), 0);
}

void UToyCampaignSubsystem::SaveProgress()
{
	UToyCampaignSave* Save = Cast<UToyCampaignSave>(
		UGameplayStatics::CreateSaveGameObject(UToyCampaignSave::StaticClass()));
	Save->UnlockedIndex = UnlockedIndex;
	UGameplayStatics::SaveGameToSlot(Save, SlotName(), 0);
}

void UToyCampaignSubsystem::LoadProgress()
{
	if (UToyCampaignSave* Save = Cast<UToyCampaignSave>(UGameplayStatics::LoadGameFromSlot(SlotName(), 0)))
	{
		UnlockedIndex = Save->UnlockedIndex;
	}
	else
	{
		UnlockedIndex = 0;
	}
}
