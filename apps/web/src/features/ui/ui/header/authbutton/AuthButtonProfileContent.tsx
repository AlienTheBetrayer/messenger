"use client";

import Link from "next/link";

import { Icons } from "@/features/ui/lib";
import { ThemeButton } from "@/features/ui/ui/header/ThemeButton";
import { LogoutMessageBox } from "@/features/ui/ui/messageboxes/LogoutMessageBox";
import { Button, PopoverContent, Separator } from "@/shared";

export const AuthButtonProfileContent = () => {
	// jsx
	return (
		<PopoverContent
			className="w-screen max-w-48"
			align="end"
		>
			<ul className="flex flex-col gap-2 *:flex">
				<li>
					<ul className="flex flex-col w-full">
						<li>
							<Button
								asChild
								className="w-full justify-start"
								variant="ghost"
							>
								<Link href="/profile">
									{Icons.profile}
									Profile
								</Link>
							</Button>
						</li>

						<li>
							<Button
								asChild
								className="w-full justify-start"
								variant="ghost"
							>
								<Link href="/profile">
									{Icons.profile}
									Profile
								</Link>
							</Button>
						</li>

						<li>
							<Button
								asChild
								className="w-full justify-start"
								variant="ghost"
							>
								<Link href="/settings">
									{Icons.settings}
									Settings
								</Link>
							</Button>
						</li>

						<li>
							<ThemeButton>
								<Button
									className="w-full justify-start"
									variant="ghost"
								>
									{Icons.theme}
									Theme
								</Button>
							</ThemeButton>
						</li>
					</ul>
				</li>

				<li>
					<Separator />
				</li>

				<li>
					<ul className="flex flex-col w-full">
						<li>
							<LogoutMessageBox />
						</li>
					</ul>
				</li>
			</ul>
		</PopoverContent>
	);
};
