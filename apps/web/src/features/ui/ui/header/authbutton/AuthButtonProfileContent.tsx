"use client";

import { CircleUserRound, LogOut } from "lucide-react";
import Link from "next/link";

import { useLogoutMutation } from "@/features/auth/model/auth.slice";
import { useAuthButtonNotifications } from "@/features/ui/ui/header/authbutton/useAuthButtonNotifications";
import {
	Button,
	normalizeError,
	PopoverContent,
	Separator,
	Spinner,
} from "@/shared";

export const AuthButtonProfileContent = () => {
	// redux
	const [logout, { isLoading }] = useLogoutMutation();
	const notifications = useAuthButtonNotifications();

	// jsx
	return (
		<PopoverContent
			className="w-screen max-w-64"
			align="end"
		>
			<ul className="flex flex-col gap-2 *:flex">
				<li>
					<Button
						asChild
						className="w-full justify-start"
						variant="ghost"
					>
						<Link href="/profile">
							<CircleUserRound />
							Profile
						</Link>
					</Button>
				</li>

				<li>
					<Separator />
				</li>

				<li>
					<Button
						disabled={isLoading}
						variant="destructive"
						className="w-full"
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
						{isLoading && <Spinner />}
						<LogOut />
						Log out
					</Button>
				</li>
			</ul>
		</PopoverContent>
	);
};
