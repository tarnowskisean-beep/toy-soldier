// ToyPatrolComponent.cpp — waypoint patrol that yields to combat.

#include "ToyPatrolComponent.h"
#include "ToySoldier.h"
#include "ToyHUDTypes.h"   // ESquadOrder

UToyPatrolComponent::UToyPatrolComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.25f;
}

void UToyPatrolComponent::TickComponent(float DeltaTime, ELevelTick TickType,
	FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	if (!Owner.IsValid()) Owner = Cast<AToySoldier>(GetOwner());
	if (!Owner.IsValid() || !Owner->IsAlive() || Waypoints.Num() == 0) return;

	// Alerted (or chasing a target) → let the combat AI run; pause patrolling.
	if (Owner->Order == ESquadOrder::Attack) return;

	AActor* WP = Waypoints.IsValidIndex(Index) ? Waypoints[Index] : nullptr;
	if (!WP) { Advance(); return; }

	const float Dist = FVector::Dist2D(Owner->GetActorLocation(), WP->GetActorLocation());
	if (Dist <= ReachRadius)
	{
		Advance();   // reached this point, head to the next
	}
	else
	{
		// Steer the soldier there using its existing Move order behavior.
		Owner->Order = ESquadOrder::Move;
		Owner->MoveGoal = WP->GetActorLocation();
	}
}

void UToyPatrolComponent::Advance()
{
	const int32 Count = Waypoints.Num();
	if (Count <= 1) return;

	if (bLoop)
	{
		Index = (Index + 1) % Count;
	}
	else
	{
		// Ping-pong along the route.
		if (bForward && Index >= Count - 1) bForward = false;
		else if (!bForward && Index <= 0) bForward = true;
		Index += bForward ? 1 : -1;
	}
}
