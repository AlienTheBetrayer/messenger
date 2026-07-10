"use client";

import { Authentication } from "@/features/ui/ui/menubar/menus/Authentication";
import { Logo } from "@/features/ui/ui/menubar/menus/Logo";
import { Themes } from "@/features/ui/ui/menubar/menus/Themes";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	Separator,
} from "@/shared/ui";

export const AppMenubar = () => {
	return (
		<header className="flex items-center sticky top-0 w-full! p-1 h-10! z-10">
			<ul className="flex items-center w-full rounded-none! border-0 *:text-xs p-0.5! h-full *:h-full [&_button]:h-full">
				<li>
					<Logo />
				</li>

				<li className="flex">
					<Separator
						orientation="vertical"
						className="h-2/3 my-auto"
					/>
				</li>

				<li>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="xs"
							>
								File
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="start">
							{/* File */}
						</DropdownMenuContent>
					</DropdownMenu>
				</li>

				<li>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="xs"
							>
								Edit
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="start">
							{/* Edit */}
						</DropdownMenuContent>
					</DropdownMenu>
				</li>

				<li>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="xs"
							>
								View
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="start">
							{/* View */}
						</DropdownMenuContent>
					</DropdownMenu>
				</li>

				<li>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="xs"
							>
								Profiles
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="start">
							{/* Profiles */}
						</DropdownMenuContent>
					</DropdownMenu>
				</li>

				<li>
					<Themes />
				</li>

				<li className="ml-auto h-full">
					<Authentication />
				</li>
			</ul>
		</header>
	);
};
