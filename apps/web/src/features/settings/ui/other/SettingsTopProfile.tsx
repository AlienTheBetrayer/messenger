"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared";

export const SettingsTopProfile = () => {
	// auth
	const auth = useAuth();

	// loading skeleton
	if (!auth) {
		return null;
	}

	// jsx
	return (
		<aside className="flex w-full">
			<ul className="flex w-full">
				<li>
					<Image
						alt="pfp"
						src={auth.user.image_url}
						width={36}
						height={36}
					/>
				</li>

				<li className="flex flex-col gap-2">
					<span className="truncate">
						{auth.user.username ?? auth.user.email}
					</span>
					<span>Your personal account</span>
				</li>

				<li className="ml-auto!">
					<Button
						asChild
						variant="link"
					>
						<Link href="/profile">Go to your profile</Link>
					</Button>
				</li>
			</ul>
		</aside>
	);
};
