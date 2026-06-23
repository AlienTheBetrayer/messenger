import { LogOut } from "lucide-react";
import Link from "next/link";

import { useLogoutMutation } from "@/features/auth/model/auth.api";
import { Icons } from "@/features/ui/lib";
import { useAuthButtonNotifications } from "@/features/ui/ui/header/authbutton/useAuthButtonNotifications";
import { normalizeError } from "@/shared";
import { Button, Spinner } from "@/shared/ui";
import { MessageBox } from "@/shared/ui/custom/MessageBox";

export const LogoutMessageBox = () => {
	// states
	const [logout, { isLoading }] = useLogoutMutation();
	const notifications = useAuthButtonNotifications();

	// jsx
	return (
		<MessageBox
			title="Log out?"
			variant="destructive"
			actionText="Log out"
			icon={Icons.logout}
			onConfirm={() => {
				notifications.logout(async () => {
					const { data, error } = await logout();
					if (error) throw new Error(normalizeError(error));
					return data;
				});
			}}
			description={
				<>
					This will log you out of your account on this device. View{" "}
					<Link
						href="/settings"
						className="text-link hover:underline font-medium"
					>
						Settings
					</Link>{" "}
					to change security setups.
				</>
			}
		>
			<Button
				disabled={isLoading}
				variant="destructive"
				className="w-full text-xs gap-1.5"
			>
				{isLoading ? (
					<Spinner className="size-3.5" />
				) : (
					<LogOut className="size-3.5" />
				)}
				<span>{isLoading ? "Logging out..." : "Log out"}</span>
			</Button>
		</MessageBox>
	);
};
