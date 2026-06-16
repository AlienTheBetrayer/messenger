import Link from "next/link";

import { useLogoutMutation } from "@/features/auth/model/auth.slice";
import { Icons } from "@/features/ui/lib";
import { useAuthButtonNotifications } from "@/features/ui/ui/header/authbutton/useAuthButtonNotifications";
import { normalizeError } from "@/shared";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Spinner,
} from "@/shared/ui";

export const LogoutMessageBox = ({
	children,
}: {
	children?: React.ReactNode;
}) => {
	// logic
	const [logout, { isLoading }] = useLogoutMutation();
	const notifications = useAuthButtonNotifications();

	// jsx
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{children ?? (
					<Button
						disabled={isLoading}
						variant="destructive"
						className="w-full"
					>
						{isLoading && <Spinner />}
						{Icons.logout}
						Log out
					</Button>
				)}
			</AlertDialogTrigger>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						{Icons.logout}
					</AlertDialogMedia>
					<AlertDialogTitle>Log out?</AlertDialogTitle>
					<AlertDialogDescription>
						<span>
							This will log you out of your account on this device. View
						</span>{" "}
						<Link href="/settings">Settings</Link>{" "}
						<span>to change any privacy and security settings.</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="secondary">Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						onClick={() => {
							notifications.logout(async () => {
								const { data, error } = await logout();

								if (error) {
									throw new Error(normalizeError(error));
								}

								return data;
							});
						}}
					>
						Log out
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
