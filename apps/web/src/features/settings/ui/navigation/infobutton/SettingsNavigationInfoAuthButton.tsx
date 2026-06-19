import Link from "next/link";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { InfoCube } from "@/features/settings/ui/navigation/infobutton/InfoCube";
import { NavigationInfoButton } from "@/features/settings/ui/navigation/infobutton/NavigationInfoButton";
import { NavigationInfoButtonText } from "@/features/settings/ui/navigation/infobutton/NavigationInfoButtonText";

export const SettingsNavigationInfoAuthButton = ({
	className,
}: {
	className?: string;
}) => {
	// auth
	const { data: auth } = useAuth();

	// fallback
	if (!auth) {
		return <div className="w-full h-12 rounded-lg skeleton" />;
	}

	// jsx
	return (
		<NavigationInfoButton className={className}>
			<Link
				href="/profile"
				className="flex items-center gap-3 w-full"
			>
				<InfoCube
					image={auth.user.image_url}
          color={auth.user.color}
          bouncing
				/>

				<NavigationInfoButtonText
					title={auth.user.username}
					description={auth.user.status ?? "No status"}
				/>
			</Link>
		</NavigationInfoButton>
	);
};
