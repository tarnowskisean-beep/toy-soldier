// BaseplateMovementComponent.cpp — Script 2 implementation.

#include "BaseplateMovementComponent.h"

#include "GameFramework/Character.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "Components/CapsuleComponent.h"
#include "Components/AudioComponent.h"
#include "Kismet/GameplayStatics.h"
#include "PhysicalMaterials/PhysicalMaterial.h"
#include "Engine/World.h"

UBaseplateMovementComponent::UBaseplateMovementComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	// The floor under your feet doesn't change every frame — 10x/sec is ample and cheap.
	PrimaryComponentTick.TickInterval = 0.1f;
}

void UBaseplateMovementComponent::BeginPlay()
{
	Super::BeginPlay();

	OwnerCharacter = Cast<ACharacter>(GetOwner());
	if (OwnerCharacter.IsValid())
	{
		if (UCharacterMovementComponent* Move = OwnerCharacter->GetCharacterMovement())
		{
			Move->MaxWalkSpeed = DefaultSpeed;
		}
	}
}

void UBaseplateMovementComponent::TickComponent(float DeltaTime, ELevelTick TickType,
	FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	if (!OwnerCharacter.IsValid())
	{
		return;
	}

	const UCapsuleComponent* Capsule = OwnerCharacter->GetCapsuleComponent();
	if (!Capsule)
	{
		return;
	}

	const FVector Start = Capsule->GetComponentLocation();
	const float TraceLength = Capsule->GetScaledCapsuleHalfHeight() + TraceExtra;
	const FVector End = Start - FVector(0.f, 0.f, TraceLength);

	// IMPORTANT: bReturnPhysicalMaterial must be true or Hit.PhysMaterial stays null.
	FHitResult Hit;
	FCollisionQueryParams Params(SCENE_QUERY_STAT(BaseplateSurface), /*bTraceComplex=*/false, GetOwner());
	Params.bReturnPhysicalMaterial = true;

	if (GetWorld()->LineTraceSingleByChannel(Hit, Start, End, ECC_Visibility, Params))
	{
		UPhysicalMaterial* Surface = Hit.PhysMaterial.Get();
		if (Surface != CurrentSurface)   // only react when the surface actually changes
		{
			ApplySurface(Surface);
		}
	}
}

void UBaseplateMovementComponent::ApplySurface(UPhysicalMaterial* Surface)
{
	CurrentSurface = Surface;

	if (!OwnerCharacter.IsValid())
	{
		return;
	}

	float NewSpeed = DefaultSpeed;
	USoundBase* Loop = nullptr;

	if (Surface == CarpetMaterial)
	{
		NewSpeed = CarpetSpeed;
		Loop = CarpetDragLoop;
	}
	else if (Surface == HardwoodMaterial)
	{
		NewSpeed = HardwoodSpeed;
		Loop = HardwoodScrapeLoop;
	}

	if (UCharacterMovementComponent* Move = OwnerCharacter->GetCharacterMovement())
	{
		Move->MaxWalkSpeed = NewSpeed;
	}

	// Swap the footstep loop to match the surface.
	if (ActiveLoop.IsValid())
	{
		ActiveLoop->Stop();
		ActiveLoop.Reset();
	}
	if (Loop)
	{
		ActiveLoop = UGameplayStatics::SpawnSoundAttached(Loop, OwnerCharacter->GetRootComponent());
	}
}
