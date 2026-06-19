"use client";

import { useNavigationTree } from "@/features/settings/hooks/useNavigationTree";
import { InfoCube } from "@/features/settings/ui/navigation/infobutton/InfoCube";
import { NavigationInfoButton } from "@/features/settings/ui/navigation/infobutton/NavigationInfoButton";
import { NavigationInfoButtonText } from "@/features/settings/ui/navigation/infobutton/NavigationInfoButtonText";
import { SettingsNavigationInfoAuthButton } from "@/features/settings/ui/navigation/infobutton/SettingsNavigationInfoAuthButton";
import { Icons } from "@/features/ui/lib";
import { Separator } from "@/shared";

export const SettingsNavigation = () => {
	// hooks
	const { jsx } = useNavigationTree();

	// jsx
	return (
		<nav className="flex flex-col gap-4">
			<ul className="flex flex-col">
				<li className="h-15">
					<SettingsNavigationInfoAuthButton />
				</li>

				<li className="h-15">
					<NavigationInfoButton asChild={false}>
						<InfoCube
							image={Icons.box}
							color="var(--blue-primary)"
						/>

						<NavigationInfoButtonText
							title="Something important here"
							description="it will be here"
						/>
					</NavigationInfoButton>
				</li>
			</ul>

			<Separator />

			<div>{jsx}</div>
		</nav>
	);
};
