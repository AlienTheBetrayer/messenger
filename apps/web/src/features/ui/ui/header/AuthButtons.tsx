"use client";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";

import { getAuth } from "@/features/auth/server/routes";
import { Button } from "@/shared";

export const AuthButtons = ({
	auth,
}: {
	auth: Awaited<ReturnType<typeof getAuth>>;
}) => {
	// logged in
	if ("user" in auth) {
		return (
			<ul className="flex gap-1">
				<li>
					<Button
						asChild
						variant="ghost"
					>
						<Link href="/profile">
							<CircleUserRound />
							Profile
						</Link>
					</Button>
				</li>
			</ul>
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
