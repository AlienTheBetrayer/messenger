"use client";

import { Authentication } from "@/features/ui/ui/menubar/menus/Authentication";
import { Logo } from "@/features/ui/ui/menubar/menus/Logo";
import { Themes } from "@/features/ui/ui/menubar/menus/Themes";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
	Separator,
} from "@/shared/ui";

export const AppMenubar = () => {
	return (
		<nav className="flex items-center w-screen fixed top-0 right-0 left-0 p-1 h-10! backdrop-blur-md z-10">
			<Menubar className="w-full rounded-none! border-0 *:text-xs p-0.5! items-stretch h-full [&>button]:p-2">
				<Logo />

				<Separator
					orientation="vertical"
					className="my-auto h-2/3"
				/>

				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarGroup>
							<MenubarItem>
								New Tab <MenubarShortcut>⌘T</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								New Window <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem disabled>New Incognito Window</MenubarItem>
						</MenubarGroup>
						<MenubarSeparator />

						<MenubarGroup>
							<MenubarSub>
								<MenubarSubTrigger>Share</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarGroup>
										<MenubarItem>Email link</MenubarItem>
										<MenubarItem>Messages</MenubarItem>
										<MenubarItem>Notes</MenubarItem>
									</MenubarGroup>
								</MenubarSubContent>
							</MenubarSub>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem>
								Print... <MenubarShortcut>⌘P</MenubarShortcut>
							</MenubarItem>
						</MenubarGroup>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarGroup>
							<MenubarItem>
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarSub>
								<MenubarSubTrigger>Find</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarGroup>
										<MenubarItem>Search the web</MenubarItem>
									</MenubarGroup>
									<MenubarSeparator />
									<MenubarGroup>
										<MenubarItem>Find...</MenubarItem>
										<MenubarItem>Find Next</MenubarItem>
										<MenubarItem>Find Previous</MenubarItem>
									</MenubarGroup>
								</MenubarSubContent>
							</MenubarSub>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem>Cut</MenubarItem>
							<MenubarItem>Copy</MenubarItem>
							<MenubarItem>Paste</MenubarItem>
						</MenubarGroup>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent className="w-44">
						<MenubarGroup>
							<MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
							<MenubarCheckboxItem checked>Full URLs</MenubarCheckboxItem>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem inset>
								Reload <MenubarShortcut>⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarItem
								disabled
								inset
							>
								Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
							</MenubarItem>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem inset>Toggle Fullscreen</MenubarItem>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem inset>Hide Sidebar</MenubarItem>
						</MenubarGroup>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger>Profiles</MenubarTrigger>
					<MenubarContent>
						<MenubarRadioGroup value="benoit">
							<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
							<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
							<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
						</MenubarRadioGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem inset>Edit...</MenubarItem>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarItem inset>Add Profile...</MenubarItem>
						</MenubarGroup>
					</MenubarContent>
				</MenubarMenu>

				<Themes />
				<Authentication className="ml-auto [&_button]:rounded-sm [&_a]:rounded-sm" />
			</Menubar>
		</nav>
	);
};
