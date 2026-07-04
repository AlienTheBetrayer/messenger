import { HeaderProvider } from "@/features/ui/providers/HeaderProvider";
import { AuthButtons } from "@/features/ui/ui/header/AuthButtons";
import { Navigation } from "@/features/ui/ui/header/Navigation";
import { ThemeButton } from "@/features/ui/ui/header/themebutton/ThemeButton";
import { Separator } from "@/shared";

export const Header = async () => {
	return (
		<HeaderProvider>
			<header className="sticky top-0 w-full z-50 bg-background/40 backdrop-blur-sm p-3 flex items-center justify-center">
				<nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
					<Navigation />

					<ul className="flex items-center gap-1.5 ml-auto">
						<li className="flex items-center">
							<Separator
								orientation="vertical"
								className="h-4 bg-border/60 my-auto"
							/>
						</li>

						<li className="flex items-center">
							<ThemeButton />
						</li>

						<li className="flex items-center">
							<Separator
								orientation="vertical"
								className="h-4 bg-border/60 my-auto"
							/>
						</li>

						<li className="flex items-center">
							<AuthButtons />
						</li>
					</ul>
				</nav>
			</header>
		</HeaderProvider>
	);
};
