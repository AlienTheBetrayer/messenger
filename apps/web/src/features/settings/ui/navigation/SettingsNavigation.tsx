"use client";

import { useNavigationTree } from "@/features/settings/hooks/useNavigationTree";
import { InfoCube } from "@/features/settings/ui/navigation/infobutton/InfoCube";
import { NavigationInfoButtonText } from "@/features/settings/ui/navigation/infobutton/NavigationInfoButtonText";
import { SettingsNavigationInfoAuthButton } from "@/features/settings/ui/navigation/infobutton/SettingsNavigationInfoAuthButton";
import { Icons } from "@/features/ui/lib";
import { Button } from "@/shared";

export const SettingsNavigation = () => {
	// hooks
	const { jsx } = useNavigationTree();

	// jsx
	return (
		<nav className="flex flex-col gap-8">
			<ul className="flex flex-col">
				<li className="h-15">
					<SettingsNavigationInfoAuthButton />
				</li>

				<li className="h-15">
					<Button
						variant="ghost"
						className="flex gap-2 w-full h-full"
					>
						<InfoCube
							image={Icons.box}
							color="var(--blue-primary)"
							animation="bounce"
						/>

						<NavigationInfoButtonText
							title="Something important here"
							description="it will be here"
						/>
					</Button>
				</li>
			</ul>

			<div className="ml-6">{jsx}</div>
		</nav>
	);
};
