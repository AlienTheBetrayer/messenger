"use client";

import { SettingsIcon, UserRound } from "lucide-react";
import Link from "next/link";

import { Connections } from "@/features/connections/ui/Connections";
import { LogoutMessageBox } from "@/features/ui/ui/messageboxes/LogoutMessageBox";
import { Button, PopoverContent, PopoverHeader, Separator } from "@/shared";

export const AuthButtonProfileContent = () => {
	return (
		<PopoverContent className="w-screen max-w-60">
			<PopoverHeader>
				<Connections />
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
						<Link href="/profile">
							<UserRound />
							Profile
						</Link>
					</Button>
				</li>
			</ul>

			<Separator />

			<LogoutMessageBox />
		</PopoverContent>
	);
};
