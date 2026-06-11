"use server";

import { serverGetAuth } from "@/features/auth/server/routes";
import { AuthButtons } from "@/features/ui/ui/header/AuthButtons";
import { Navigation } from "@/features/ui/ui/header/Navigation";
import { ThemeButton } from "@/features/ui/ui/header/ThemeButton";
import { Separator } from "@/shared";

export const Header = async () => {
	// server fetching
	const auth = await serverGetAuth();

	// jsx
	return (
		<header className="sticky! top-0 w-full z-2 mx-auto flex items-center justify-center backdrop-blur-xl p-4">
			<nav className="w-full max-w-400 flex gap-2 items-center">
				<Navigation />

				<ul className="flex gap-1 ml-auto">
					<li className="flex">
						<Separator
							orientation="vertical"
							className="h-4 my-auto"
						/>
					</li>

					<li>
						<ThemeButton />
					</li>

					<li className="flex">
						<Separator
							orientation="vertical"
							className="h-4 my-auto"
						/>
					</li>

					<li className="flex">
						<AuthButtons auth={auth} />
					</li>
				</ul>
			</nav>
		</header>
	);
};
