// ToySoldier.cpp — soldier setup, player firing, and the AI step (ported soldier.js).

#include "ToySoldier.h"

#include "ToyMacroCameraComponent.h"
#include "PlasticHealthComponent.h"
#include "ToyGrenade.h"
#include "GameFramework/SpringArmComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "CineCameraComponent.h"
#include "Kismet/GameplayStatics.h"
#include "EngineUtils.h"               // TActorIterator
#include "Engine/World.h"

AToySoldier::AToySoldier()
{
	PrimaryActorTick.bCanEverTick = true;

	// Third-person rig: spring arm + cine camera (so the macro lens has a camera).
	SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm"));
	SpringArm->SetupAttachment(RootComponent);
	SpringArm->TargetArmLength = 220.f;          // tight, toy-scale
	SpringArm->bUsePawnControlRotation = true;
	SpringArm->bEnableCameraLag = true;

	Camera = CreateDefaultSubobject<UCineCameraComponent>(TEXT("ToyCamera"));
	Camera->SetupAttachment(SpringArm);

	MacroLens = CreateDefaultSubobject<UToyMacroCameraComponent>(TEXT("MacroLens"));
	MacroLens->TargetCamera = Camera;

	Health = CreateDefaultSubobject<UPlasticHealthComponent>(TEXT("PlasticHealth"));
	Health->bAutoShatterOnZero = false;          // squad members down, not shatter

	// We drive rotation ourselves in AI; the controller handles it when possessed.
	GetCharacterMovement()->bOrientRotationToMovement = false;
	bUseControllerRotationYaw = false;

	// Unpossessed soldiers get a default AI controller automatically.
	AutoPossessAI = EAutoPossessAI::PlacedInWorldOrSpawned;
}

void AToySoldier::BeginPlay()
{
	Super::BeginPlay();

	if (ClassData)
	{
		GetCharacterMovement()->MaxWalkSpeed = ClassData->MoveSpeed;
		Ammo = ClassData->MagazineSize;
		AmmoReserve = ClassData->ReserveAmmo;
		if (Health)
		{
			Health->MaxIntegrity = ClassData->MaxIntegrity;
			Health->PlasticIntegrity = ClassData->MaxIntegrity;
		}
	}
}

void AToySoldier::Tick(float DeltaSeconds)
{
	Super::Tick(DeltaSeconds);

	FireCooldown = FMath::Max(0.f, FireCooldown - DeltaSeconds);
	AbilityCooldown = FMath::Max(0.f, AbilityCooldown - DeltaSeconds);
	Suppressed = FMath::Max(0.f, Suppressed - DeltaSeconds);

	// The Heavy's suppress stance slows the legs while dug in.
	if (GetCharacterMovement())
	{
		GetCharacterMovement()->MaxWalkSpeed = GetMoveSpeed() * (bSuppressing ? 0.5f : 1.f);
	}

	// Poll health for the "downed" transition (bAutoShatterOnZero is off for squad).
	if (!bDowned && Health && Health->PlasticIntegrity <= 0.f)
	{
		GoDown();
	}

	if (!bPlayerControlled && !bDowned)
	{
		RunAIStep(DeltaSeconds);
	}
}

void AToySoldier::SetPlayerControlled(bool bIsPlayer)
{
	bPlayerControlled = bIsPlayer;
	// When you take over, your facing should follow the camera; when AI, we steer.
	bUseControllerRotationYaw = bIsPlayer;
}

float AToySoldier::GetIntegrityPct() const
{
	return Health ? Health->GetIntegrityPct() : 0.f;
}

float AToySoldier::GetMoveSpeed() const
{
	return ClassData ? ClassData->MoveSpeed : 400.f;
}

// ---------- Player firing ----------
void AToySoldier::TryFire(const FVector& AimPoint)
{
	if (bDowned || FireCooldown > 0.f || Ammo <= 0)
	{
		return;
	}
	FireBulletAt(AimPoint, /*bConsumeAmmo=*/true);
	FireCooldown = EffectiveFireInterval();
}

bool AToySoldier::TryConsumeAbility()
{
	if (bDowned || AbilityCooldown > 0.f || !ClassData) return false;
	AbilityCooldown = ClassData->AbilityCooldown;
	return true;
}

void AToySoldier::ActivateAbility(const FVector& AimPoint)
{
	if (!TryConsumeAbility()) return;

	// Press-abilities handled here: the Leader lobs a grenade. (Revive is driven by
	// the squad component, which knows the downed members; suppress/scope are holds.)
	if (ClassData->Ability == EAbilityType::Grenade && GrenadeClass)
	{
		FActorSpawnParameters P;
		P.Owner = this;
		P.Instigator = this;
		const FVector SpawnLoc = GetActorLocation() + GetActorForwardVector() * 60.f + FVector(0, 0, 60.f);
		if (AToyGrenade* G = GetWorld()->SpawnActor<AToyGrenade>(GrenadeClass, SpawnLoc, GetActorRotation(), P))
		{
			G->LaunchToward(AimPoint);
		}
	}

	OnAbilityActivated(ClassData->Ability, AimPoint);   // BP hook for extra VFX
}

float AToySoldier::EffectiveFireInterval() const
{
	const float Base = ClassData ? ClassData->FireInterval : 0.15f;
	return bSuppressing ? Base * 0.5f : Base;   // Heavy suppress fires faster
}

float AToySoldier::EffectiveSpreadDeg() const
{
	const float Base = ClassData ? ClassData->SpreadDegrees : 1.f;
	return bSuppressing ? Base * 2.5f : Base;   // ...but less accurately
}

void AToySoldier::ApplySuppressionToEnemies()
{
	const FVector Fwd = GetActorForwardVector();
	const FVector Loc = GetActorLocation();
	const float RangeSq = FMath::Square(2500.f);

	for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
	{
		AToySoldier* S = *It;
		if (S->Team != EToyTeam::Tan || !S->IsAlive()) continue;
		const FVector To = S->GetActorLocation() - Loc;
		if (To.SizeSquared() > RangeSq) continue;
		if (FVector::DotProduct(Fwd, To.GetSafeNormal()) < 0.5f) continue;  // ~60° cone
		S->Suppressed = FMath::Max(S->Suppressed, 0.7f);
	}
}

void AToySoldier::Revive(float Pct)
{
	if (!bDowned)
	{
		return;
	}
	bDowned = false;
	if (Health)
	{
		Health->PlasticIntegrity = Health->MaxIntegrity * Pct;
	}
	GetCharacterMovement()->SetMovementMode(MOVE_Walking);
	SetActorEnableCollision(true);
}

// ---------- AI (ported from soldier.js _controlAI) ----------
void AToySoldier::RunAIStep(float Dt)
{
	// Who to shoot.
	AActor* Engage = nullptr;
	if (Order == ESquadOrder::Attack)
	{
		if (!AttackTarget || !Cast<AToySoldier>(AttackTarget) || !Cast<AToySoldier>(AttackTarget)->IsAlive())
		{
			AttackTarget = FindEnemy(/*bRequireRangeAndLOS=*/false); // auto-acquire
		}
		Engage = AttackTarget;
	}
	else
	{
		Engage = FindEnemy(/*bRequireRangeAndLOS=*/true);
	}

	// Where to walk.
	const float Range = ClassData ? ClassData->EngageRange : 4000.f;
	FVector Goal = FVector::ZeroVector;
	bool bHasGoal = false;
	float Standoff = 60.f;

	switch (Order)
	{
	case ESquadOrder::Follow: Goal = FormationSlot; bHasGoal = true; break;
	case ESquadOrder::Move:
		Goal = MoveGoal; bHasGoal = true;
		if (FVector::Dist2D(GetActorLocation(), MoveGoal) < 120.f) Order = ESquadOrder::Hold;
		break;
	case ESquadOrder::Attack:
		if (Engage) { Goal = Engage->GetActorLocation(); bHasGoal = true; Standoff = Range * 0.6f; }
		break;
	case ESquadOrder::Hold:
	default: break;
	}

	if (bHasGoal)
	{
		FVector To = Goal - GetActorLocation(); To.Z = 0.f;
		const float Dist = To.Size();
		if (Dist > Standoff)
		{
			To /= Dist;
			AddMovementInput(To, 1.f);
			if (!Engage) FaceDirection(To, Dt);   // face travel unless engaging
		}
	}

	// Engage: face + fire on a clear line.
	if (Engage)
	{
		FVector ToE = Engage->GetActorLocation() - GetActorLocation(); ToE.Z = 0.f;
		FaceDirection(ToE, Dt);
		// Pinned by enemy suppressing fire? Hold fire until it lifts.
		if (FireCooldown <= 0.f && Suppressed <= 0.f && HasLineOfSight(Engage))
		{
			FireBulletAt(Engage->GetActorLocation() + FVector(0, 0, 40.f), /*bConsumeAmmo=*/false);
			FireCooldown = EffectiveFireInterval();
		}
	}
}

// ---------- Shared combat helpers ----------
void AToySoldier::FireBulletAt(const FVector& AimPoint, bool bConsumeAmmo)
{
	const FVector Muzzle = GetActorLocation() + GetActorForwardVector() * 60.f + FVector(0, 0, 40.f);
	FVector Dir = (AimPoint - Muzzle).GetSafeNormal();

	// Random spread cone (widened while suppressing).
	const float SpreadRad = FMath::DegreesToRadians(EffectiveSpreadDeg());
	Dir = FMath::VRandCone(Dir, SpreadRad);

	const float Range = ClassData ? ClassData->EngageRange : 4000.f;
	const FVector End = Muzzle + Dir * Range;

	FHitResult Hit;
	FCollisionQueryParams Params(SCENE_QUERY_STAT(ToyShot), false, this);
	const bool bHit = GetWorld()->LineTraceSingleByChannel(Hit, Muzzle, End, ECC_Visibility, Params);
	if (bHit && Hit.GetActor())
	{
		// Point damage → the target's PlasticHealthComponent cracks/shatters it.
		UGameplayStatics::ApplyPointDamage(
			Hit.GetActor(), ClassData ? ClassData->Damage : 15.f, Dir, Hit,
			GetController(), this, UDamageType::StaticClass());
	}

	// Visual feedback: tracer beam + muzzle flash (implemented in the BP).
	OnWeaponFired(Muzzle, bHit ? Hit.ImpactPoint : End);

	if (bConsumeAmmo && Ammo > 0)
	{
		--Ammo;
	}
}

bool AToySoldier::HasLineOfSight(const AActor* Target) const
{
	if (!Target) return false;
	const FVector Start = GetActorLocation() + FVector(0, 0, 40.f);
	const FVector End = Target->GetActorLocation() + FVector(0, 0, 40.f);

	FHitResult Hit;
	FCollisionQueryParams Params(SCENE_QUERY_STAT(ToyLOS), false, this);
	Params.AddIgnoredActor(Target);
	// If the trace hits nothing between us, the view is clear.
	return !GetWorld()->LineTraceSingleByChannel(Hit, Start, End, ECC_Visibility, Params);
}

AActor* AToySoldier::FindEnemy(bool bRequireRangeAndLOS) const
{
	const EToyTeam Enemy = (Team == EToyTeam::Green) ? EToyTeam::Tan : EToyTeam::Green;
	const float Range = ClassData ? ClassData->EngageRange : 4000.f;

	AToySoldier* Best = nullptr;
	float BestDist = bRequireRangeAndLOS ? Range : TNumericLimits<float>::Max();

	for (TActorIterator<AToySoldier> It(GetWorld()); It; ++It)
	{
		AToySoldier* Other = *It;
		if (Other == this || Other->Team != Enemy || !Other->IsAlive()) continue;

		const float D = FVector::Dist(Other->GetActorLocation(), GetActorLocation());
		if (D >= BestDist) continue;
		if (bRequireRangeAndLOS && !HasLineOfSight(Other)) continue;

		BestDist = D;
		Best = Other;
	}
	return Best;
}

void AToySoldier::FaceDirection(const FVector& Dir, float Dt)
{
	if (Dir.IsNearlyZero()) return;
	const FRotator Target(0.f, Dir.Rotation().Yaw, 0.f);
	SetActorRotation(FMath::RInterpTo(GetActorRotation(), Target, Dt, 10.f));
}

void AToySoldier::GoDown()
{
	bDowned = true;
	GetCharacterMovement()->DisableMovement();
	AttackTarget = nullptr;
	OnSoldierDowned.Broadcast(this);
	// Stays in the world as a "downed" body until a medic revives it (or a later
	// system shatters it permanently).
}
