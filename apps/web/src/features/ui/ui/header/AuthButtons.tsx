"use client";

import Link from "next/link";

import { useHeaderProvider } from "@/features/ui/providers/HeaderProvider";
import { AuthButtonProfileContent } from "@/features/ui/ui/header/authbutton/AuthButtonProfileContent";
import { AuthButtonProfileTrigger } from "@/features/ui/ui/header/authbutton/AuthButtonProfileTrigger";
import { Button, Popover } from "@/shared";

export const AuthButtons = () => {
	const { auth } = useHeaderProvider();

  // if logged in
	if (auth?.user.id) {
		return (
			<Popover>
				<AuthButtonProfileTrigger />
				<AuthButtonProfileContent />
			</Popover>
		);
	}

  // not logged in
	return (
		<ul className="flex items-center gap-1.5">
			<li>
				<Button
					asChild
					variant="ghost"
					size="sm"
					className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
				>
					<Link href="/login">Log in</Link>
				</Button>
			</li>

			<li>
				<Button
					asChild
					size="sm"
					className="h-8 text-xs font-medium shadow-sm"
				>
					<Link href="/signup">Sign up</Link>
				</Button>
			</li>
		</ul>
	);
};
