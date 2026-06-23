"use client";

import { SettingsIcon, UserRound } from "lucide-react";
import Link from "next/link";

import { SessionsCombobox } from "@/features/sessions/ui/SessionsCombobox";
import { LogoutMessageBox } from "@/features/ui/ui/messageboxes/LogoutMessageBox";
import { Button, PopoverContent, PopoverHeader, Separator } from "@/shared";

export const AuthButtonProfileContent = () => {
	return (
		<PopoverContent className="w-screen max-w-60">
			<PopoverHeader>
				<SessionsCombobox />
			</PopoverHeader>

			<Separator />

			<ul>
				<li>
					<Button
						asChild
						variant="ghost"
						className="w-full justify-start text-muted-foreground"
					>
						<Link href="/settings">
							<SettingsIcon />
							Settings
						</Link>
					</Button>
				</li>

				<li>
					<Button
						asChild
						variant="ghost"
						className="w-full justify-start text-muted-foreground"
					>
						<Link href="/settings">
							<UserRound />
							Settings
						</Link>
					</Button>
				</li>
			</ul>

			<Separator />

			<LogoutMessageBox />
		</PopoverContent>
	);
};
