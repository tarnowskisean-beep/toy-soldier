// ToyMissionGameMode.h — runs the active mission for a level.
//
// Loads the mission (from the level default or the campaign subsystem), wires the
// gameplay events the objectives care about (enemy eliminated, squad wiped), and on
// end reports the result to the campaign for unlock/save.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "ToyMissionGameMode.generated.h"

class UToyMissionComponent;
class UToyMissionData;
class AToySoldier;

UCLASS()
class TOYSOLDIER_API AToyMissionGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	AToyMissionGameMode();

	/** Falls back to this if the campaign subsystem has no current mission set. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Mission")
	TObjectPtr<UToyMissionData> DefaultMission = nullptr;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Mission")
	TObjectPtr<UToyMissionComponent> MissionComp;

	UFUNCTION(BlueprintPure, Category = "Mission")
	UToyMissionComponent* GetMissionComponent() const { return MissionComp; }

	/** Spawners call this for enemies created after BeginPlay (waves). */
	UFUNCTION(BlueprintCallable, Category = "Mission")
	void RegisterEnemy(AToySoldier* Enemy);

	/** Fired for end-screen UI. */
	UFUNCTION(BlueprintImplementableEvent, Category = "Mission")
	void OnMissionResult(bool bSuccess);

protected:
	virtual void BeginPlay() override;
	virtual void Tick(float DeltaSeconds) override;

private:
	float ElapsedTime = 0.f;

	UFUNCTION() void HandleSoldierDowned(AToySoldier* Soldier);
	UFUNCTION() void HandleMissionEnded(bool bSuccess);

	void BindExistingActors();
};
