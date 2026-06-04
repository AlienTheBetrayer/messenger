import Link from "next/link";

import { ThemeButton } from "@/features/ui/ui/header/ThemeButton";
import { Button, Separator } from "@/shared";

export const Header = () => {
	return (
		<header className="sticky! top-0 w-full z-2 mx-auto flex items-center justify-center backdrop-blur-xl p-4">
			<nav className="w-full max-w-400 flex gap-2 items-center">
				<ul className="flex gap-1">
					<li>
						<Button
							asChild
							variant="ghost"
						>
							<Link href="/">Home</Link>
						</Button>
					</li>
				</ul>

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

					<li>
						<Button
							asChild
							variant="ghost"
						>
							<Link href="/login">Log in</Link>
						</Button>
					</li>

					<li>
						<Button
							asChild
							variant="default"
						>
							<Link href="/signup">Sign up</Link>
						</Button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
