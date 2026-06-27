import Link from "next/link";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { NavigationInfoButtonText } from "@/features/settings/ui/navigation/infobutton/NavigationInfoButtonText";
import { InfoCube } from "@/features/users/ui/profile/dialog/InfoCube";
import { Button } from "@/shared";

export const SettingsNavigationInfoAuthButton = ({
	className,
}: {
	className?: string;
}) => {
	// auth
	const auth = useAuth();

	// no auth fallback
	if (!auth) {
		return <div className="w-full h-full skeleton" />;
	}

	// jsx
	return (
		<Button
			variant="ghost"
			className={`flex gap-2 w-full h-full ${className ?? ""}`}
			asChild
		>
			<Link
				className="flex gap-2 w-full h-full"
				href="/profile"
			>
				<InfoCube
					image={auth.user.image_url}
					color={auth.user.color}
					animation="animate-bounce"
				/>

				<NavigationInfoButtonText
					title={auth.user.username}
					description={auth.user.status ?? "No status"}
				/>
			</Link>
		</Button>
	);
};
