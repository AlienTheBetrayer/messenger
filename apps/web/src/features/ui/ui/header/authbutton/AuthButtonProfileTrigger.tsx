"use client";

import Image from "next/image";

import { Icons } from "@/features/ui/lib";
import { useHeaderProvider } from "@/features/ui/providers/HeaderProvider";
import { Button, PopoverTrigger } from "@/shared";

export const AuthButtonProfileTrigger = () => {
	// auth
	const { auth } = useHeaderProvider();

	if (!auth) {
		return null;
	}

	// jsx
	return (
		<PopoverTrigger asChild>
			<Button
				variant="ghost"
				className="group"
			>
				{auth?.user.image_url ? (
					<Image
						alt="pfp"
						src={auth.user.image_url}
						width={16}
						height={16}
						className="grayscale-100 group-hover:grayscale-0"
					/>
				) : (
					Icons.profile
				)}
				Profile
			</Button>
		</PopoverTrigger>
	);
};
