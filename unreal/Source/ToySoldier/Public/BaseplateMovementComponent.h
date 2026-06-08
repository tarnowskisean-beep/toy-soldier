// BaseplateMovementComponent.h — Script 2: Baseplate Shuffle.
//
// Toy soldiers are molded onto flat plastic baseplates, so they glide on smooth
// hardwood but bog down in shag carpet. This component traces the floor beneath the
// owning Character, reads the surface's Physical Material, and adjusts MaxWalkSpeed
// (and a looping scrape/drag sound) accordingly.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "BaseplateMovementComponent.generated.h"

class ACharacter;
class UAudioComponent;
class UPhysicalMaterial;
class USoundBase;

UCLASS(ClassGroup = (ToySoldier), meta = (BlueprintSpawnableComponent))
class TOYSOLDIER_API UBaseplateMovementComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UBaseplateMovementComponent();

	// --- Surfaces (assign your PhysicalMaterial assets here) ---
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Surfaces")
	TObjectPtr<UPhysicalMaterial> HardwoodMaterial = nullptr;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Surfaces")
	TObjectPtr<UPhysicalMaterial> CarpetMaterial = nullptr;

	// --- Speeds ---
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Speeds")
	float HardwoodSpeed = 400.f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Speeds")
	float CarpetSpeed = 240.f;   // ~40% slower

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Speeds")
	float DefaultSpeed = 400.f;  // unknown / unmapped surfaces

	// --- Audio (set these SoundBase assets to Looping) ---
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Audio")
	TObjectPtr<USoundBase> HardwoodScrapeLoop = nullptr;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate|Audio")
	TObjectPtr<USoundBase> CarpetDragLoop = nullptr;

	/** Extra trace length beyond the capsule's half-height, in cm. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Baseplate")
	float TraceExtra = 20.f;

protected:
	virtual void BeginPlay() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType,
		FActorComponentTickFunction* ThisTickFunction) override;

private:
	TWeakObjectPtr<ACharacter> OwnerCharacter;
	TWeakObjectPtr<UAudioComponent> ActiveLoop;
	TObjectPtr<UPhysicalMaterial> CurrentSurface = nullptr;

	void ApplySurface(UPhysicalMaterial* Surface);
};
