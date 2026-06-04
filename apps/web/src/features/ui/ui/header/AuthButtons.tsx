import { CircleUserRound } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/features/auth/model/auth.selectors";
import { Button, Spinner } from "@/shared";

export const AuthButtons = () => {
	// authentication
	const auth = useAuth();

	if (auth.isLoading || auth.isUninitialized) {
		return (
			<span className="flex items-center justify-center">
				<Spinner />
			</span>
		);
	}

	// logged in
	if (auth.data) {
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
