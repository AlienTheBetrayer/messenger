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
			<ul className="flex flex-col gap-1 w-full">
				{/* 1. Header Account Profile Details Container */}
				<li className="h-14 w-full px-1 flex items-center">
					<SettingsNavigationInfoAuthButton />
				</li>

				<li className="py-0.5">
					<Separator className="opacity-60" />
				</li>

				{/* 2. Core Navigation Menu Options */}
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
					</ul>
				</li>

				<li className="py-0.5">
					<Separator className="opacity-60" />
				</li>

				{/* 3. NEW: System Performance & Operational Workspace Telemetry */}
				<li>
					<ul className="flex flex-col w-full gap-1 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground/80">
						<li className="flex items-center justify-between">
							<span className="flex items-center gap-1.5">
								<span className="relative flex h-1.5 w-1.5">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
									<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
								</span>
								Outwave Edge Engine
							</span>
							<span className="font-mono text-[10px] text-muted-foreground/50 bg-muted px-1 py-0.5 rounded">
								Operational
							</span>
						</li>

						<li className="flex items-center justify-between text-muted-foreground/60 pt-0.5">
							<span>Command Menu</span>
							<kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-border/70 bg-muted px-1.5 font-mono text-[9px] font-medium opacity-100 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
								<span>⌘</span>K
							</kbd>
						</li>
					</ul>
				</li>

				<li className="py-0.5">
					<Separator className="opacity-60" />
				</li>

				{/* 4. Action Exit Area */}
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
