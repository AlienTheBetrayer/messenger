"use client";

import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useMeQuery } from "@/features/auth/model/auth.slice";
import { Button } from "@/shared";

export const AuthButtons = () => {
	// auth
	const auth = useMeQuery();

	// logged in
	if (auth.data?.user) {
		return (
			<ul className="flex gap-1 items-center">
				<li className="flex">
					<Button
						asChild
						variant="ghost"
						className="group"
					>
						<Link
							href="/profile"
							className="flex items-center justify-center"
						>
							{auth.data.user?.image_url ? (
								<Image
									alt="pfp"
									src={auth.data.user?.image_url}
									width={16}
									height={16}
									className="grayscale-100"
								/>
							) : (
								<CircleUserRound />
							)}

							<span>Profile</span>
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
