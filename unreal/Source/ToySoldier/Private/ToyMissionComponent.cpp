// ToyMissionComponent.cpp — objective state machine.

#include "ToyMissionComponent.h"
#include "ToyMissionData.h"
#include "ToySoldier.h"
#include "EngineUtils.h"

UToyMissionComponent::UToyMissionComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.25f;   // only Survive timers need ticking
}

void UToyMissionComponent::BeginMission(UToyMissionData* InMission)
{
	Mission = InMission;
	Objectives.Reset();
	bEnded = false;
	if (!Mission) return;

	for (const FMissionObjective& Def : Mission->Objectives)
	{
		FObjRuntime R;
		R.Def = Def;
		// Auto-size an Eliminate objective to the enemies present if left at <=0.
		if (Def.Type == EObjectiveType::Eliminate && Def.Required <= 0)
		{
			int32 Count = 0;
			for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
			{
				if (It->Team == EToyTeam::Tan) ++Count;
			}
			R.Def.Required = FMath::Max(1, Count);
		}
		// Optional objectives start active; the main line starts locked.
		R.State = Def.bOptional ? EObjectiveState::Active : EObjectiveState::Inactive;
		Objectives.Add(R);
	}

	ActivateNextMainObjective();
	OnObjectivesChanged.Broadcast();
}

void UToyMissionComponent::ActivateNextMainObjective()
{
	for (FObjRuntime& R : Objectives)
	{
		if (!R.Def.bOptional && R.State == EObjectiveState::Inactive)
		{
			R.State = EObjectiveState::Active;
			return;   // one main objective active at a time
		}
	}
}

void UToyMissionComponent::AddProgress(FName ObjectiveId, int32 Amount)
{
	if (bEnded) return;

	for (int32 i = 0; i < Objectives.Num(); ++i)
	{
		FObjRuntime& R = Objectives[i];
		if (R.State != EObjectiveState::Active || R.Def.ObjectiveId != ObjectiveId) continue;

		R.Progress = FMath::Min(R.Progress + Amount, R.Def.Required);
		if (R.Progress >= R.Def.Required)
		{
			CompleteObjective(i);
		}
		OnObjectivesChanged.Broadcast();
		return;
	}
}

void UToyMissionComponent::CompleteObjective(int32 Index)
{
	Objectives[Index].State = EObjectiveState::Completed;

	if (!Objectives[Index].Def.bOptional)
	{
		ActivateNextMainObjective();
	}
	if (AllRequiredComplete())
	{
		EndMission(true);
	}
}

bool UToyMissionComponent::AllRequiredComplete() const
{
	for (const FObjRuntime& R : Objectives)
	{
		if (!R.Def.bOptional && R.State != EObjectiveState::Completed) return false;
	}
	return true;
}

bool UToyMissionComponent::GetActiveObjectiveOfType(EObjectiveType Type, FName& OutId) const
{
	for (const FObjRuntime& R : Objectives)
	{
		if (R.State == EObjectiveState::Active && R.Def.Type == Type)
		{
			OutId = R.Def.ObjectiveId;
			return true;
		}
	}
	return false;
}

void UToyMissionComponent::FailMission()
{
	if (bEnded) return;
	for (FObjRuntime& R : Objectives)
	{
		if (R.State == EObjectiveState::Active) R.State = EObjectiveState::Failed;
	}
	EndMission(false);
}

void UToyMissionComponent::EndMission(bool bSuccess)
{
	if (bEnded) return;
	bEnded = true;
	OnObjectivesChanged.Broadcast();
	OnMissionEnded.Broadcast(bSuccess);
}

void UToyMissionComponent::BuildViews(TArray<FObjectiveView>& OutViews) const
{
	OutViews.Reset();
	for (const FObjRuntime& R : Objectives)
	{
		if (R.State == EObjectiveState::Inactive) continue;   // hide not-yet-unlocked
		FObjectiveView V;
		V.Description = R.Def.Description;
		V.State = R.State;
		V.Progress = R.Progress;
		V.Required = R.Def.Required;
		V.bOptional = R.Def.bOptional;
		OutViews.Add(V);
	}
}

void UToyMissionComponent::TickComponent(float DeltaTime, ELevelTick TickType,
	FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
	if (bEnded) return;

	// Advance any active Survive timers (Required is in seconds).
	for (int32 i = 0; i < Objectives.Num(); ++i)
	{
		FObjRuntime& R = Objectives[i];
		if (R.State == EObjectiveState::Active && R.Def.Type == EObjectiveType::Survive)
		{
			R.TimeAccum += DeltaTime;
			const int32 NewProgress = FMath::Min((int32)R.TimeAccum, R.Def.Required);
			if (NewProgress != R.Progress)
			{
				R.Progress = NewProgress;
				if (R.Progress >= R.Def.Required) CompleteObjective(i);
				OnObjectivesChanged.Broadcast();
			}
		}
	}
}
