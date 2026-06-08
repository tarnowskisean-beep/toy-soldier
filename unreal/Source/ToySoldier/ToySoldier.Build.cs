// ToySoldier.Build.cs — module build rules. Merge these dependencies into the
// Build.cs that UE generates for your C++ project.

using UnrealBuildTool;

public class ToySoldier : ModuleRules
{
	public ToySoldier(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] {
			"Core",
			"CoreUObject",
			"Engine",
			"InputCore",
			"CinematicCamera",   // UCineCameraComponent — the macro lens
			"Niagara",           // shatter VFX on death
			"UMG",               // tactical HUD widgets
			"Slate",
			"SlateCore",
			"EnhancedInput",     // player input (move/look/fire/abilities/wheel)
			"AIModule",          // AI controllers for unpossessed squadmates
			"NavigationSystem",
			"GameplayTasks"
		});

		PrivateDependencyModuleNames.AddRange(new string[] { });
	}
}
