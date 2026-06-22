"use client";

import Link from "next/link";

import { SettingsNavigationInfoAuthButton } from "@/features/settings/ui/navigation/infobutton/SettingsNavigationInfoAuthButton";
import { Icons } from "@/features/ui/lib";
import { LogoutMessageBox } from "@/features/ui/ui/messageboxes/LogoutMessageBox";
import { Button, PopoverContent, Separator } from "@/shared";

export const AuthButtonProfileContent = () => {
	return (
		<PopoverContent
			className="w-64 p-1.5 shadow-xl border-border/60 rounded-xl"
			align="end"
			sideOffset={6}
		>
			<ul className="flex flex-col gap-2 w-full">
				<li className="h-14 w-full px-1 flex items-center">
					<SettingsNavigationInfoAuthButton />
				</li>

				<li >
					<Separator className="opacity-60" />
				</li>

				<li>
					<ul className="flex flex-col w-full gap-0.5">
						<li>
							<Button
								asChild
								className="w-full justify-start gap-2 h-8 text-xs px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium group"
								variant="ghost"
							>
								<Link href="/profile">
									<span className="w-4 h-4 shrink-0 flex items-center justify-center text-muted-foreground/70 transition-colors group-hover:text-primary">
										{Icons.profile}
									</span>
									View Profile
								</Link>
							</Button>
						</li>

						<li>
							<Button
								asChild
								className="w-full justify-start gap-2 h-8 text-xs px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium group"
								variant="ghost"
							>
								<Link href="/settings">
									<span className="w-4 h-4 shrink-0 flex items-center justify-center text-muted-foreground/70 transition-colors group-hover:text-primary">
										{Icons.settings}
									</span>
									Account Settings
								</Link>
							</Button>
						</li>

						<li>
							<Button
								className="w-full justify-start gap-2 h-8 text-xs px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium group"
								variant="ghost"
								onClick={() => {
									console.log("hi");
								}}
								asChild
							>
								<Link href="/login">
									<span className="w-4 h-4 shrink-0 flex items-center justify-center text-muted-foreground/70 transition-colors group-hover:text-primary">
										{Icons.key}
									</span>
									Add a connection
								</Link>
							</Button>
						</li>
					</ul>
				</li>
        
				<li >
					<Separator className="opacity-60" />
				</li>

				<li>
					<ul className="flex flex-col w-full">
						<li className="flex w-full">
							<LogoutMessageBox />
						</li>
					</ul>
				</li>
			</ul>
		</PopoverContent>
	);
};
