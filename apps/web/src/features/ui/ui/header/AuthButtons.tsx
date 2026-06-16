"use client";

import Link from "next/link";

import { useHeaderProvider } from "@/features/ui/providers/HeaderProvider";
import { AuthButtonProfileContent } from "@/features/ui/ui/header/authbutton/AuthButtonProfileContent";
import { AuthButtonProfileTrigger } from "@/features/ui/ui/header/authbutton/AuthButtonProfileTrigger";
import { Button, Popover } from "@/shared";

export const AuthButtons = () => {
	// auth
	const { auth } = useHeaderProvider();

	// logged in
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
		<ul className="flex gap-1">
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
	);
};
