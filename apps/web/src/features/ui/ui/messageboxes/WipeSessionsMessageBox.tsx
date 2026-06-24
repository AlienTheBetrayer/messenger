import { Trash2Icon } from "lucide-react";
import Link from "next/link";

import { useLogoutMutation } from "@/features/auth";
import { Icons } from "@/features/ui/lib";
import { useAuthButtonNotifications } from "@/features/ui/ui/header/authbutton/useAuthButtonNotifications";
import { Button, MessageBox, normalizeError, Spinner } from "@/shared";

export const WipeSessionsMessageBox = () => {
	// states
	const [logout, { isLoading }] = useLogoutMutation();
	const notifications = useAuthButtonNotifications();

	// jsx
	return (
		<MessageBox
			title="Wipe sessions?"
			variant="destructive"
			actionText="Wipe"
			icon={Icons.trash}
			onConfirm={() => {
				notifications.logout(async () => {
					const { data, error } = await logout();
					if (error) throw new Error(normalizeError(error));
					return data;
				});
			}}
			description={
				<>
					This will clear all sessions inside of this group
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
				size="sm"
				className="gap-1.5 aspect-square"
			>
				{isLoading ? (
					<Spinner className="size-3.5" />
				) : (
					<Trash2Icon className="size-3.5" />
				)}
			</Button>
		</MessageBox>
	);
};
