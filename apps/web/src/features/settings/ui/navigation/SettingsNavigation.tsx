"use client";

import Image from "next/image";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigationTree } from "@/features/settings/hooks/useNavigationTree";
import { SettingsNavigationInfoButton } from "@/features/settings/ui/navigation/SettingsNavigationInfoButton";
import { Icons } from "@/features/ui/lib";

export const SettingsNavigation = () => {
	// hooks
	const { jsx } = useNavigationTree();
	const { data: auth } = useAuth();

	// jsx
	return (
		<nav className="flex flex-col gap-8">
			<ul className="flex flex-col">
				<li>
					{auth ? (
						<SettingsNavigationInfoButton
							title="generated username"
              description="Changing current settings..."
              color={auth.user.color}
							image={
								<Image
                  src={auth.user.image_url}
                  width={16}
                  height={16}
									alt="pfp"
								/>
							}
						/>
					) : (
						<div />
					)}
				</li>

				<li>
					<SettingsNavigationInfoButton
						title="Your profile"
						description="Changing current settings..."
						image={Icons.box}
            color="var(--blue)"
					/>
				</li>
			</ul>

			{jsx}
		</nav>
	);
};
