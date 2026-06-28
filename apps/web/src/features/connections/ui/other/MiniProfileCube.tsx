"use client";

import Link from "next/link";

import { InfoCube, usersSelectors } from "@/features/users";
import { Button, ButtonProps, useAppSelector } from "@/shared";

export const MiniProfileCube = ({
	userId,
	props,
}: {
	userId: string;
	props?: ButtonProps;
}) => {
	// redux
	const user = useAppSelector((state) =>
		usersSelectors.selectById(state, userId),
	);

	// fallback
	if (!user) {
		return null;
	}

	// jsx
	return (
		<Button
			variant="ghost"
			size="sm"
			{...props}
			asChild
		>
			<Link
				href="/profile"
				className="flex gap-2"
			>
				<InfoCube
					animation="animate-bounce"
					className="w-6 h-6"
					image={user.image_url}
					color={user.color}
				/>
				<div className="flex flex-col">
					<span className="truncate text-xs ml-0!">{user.username}</span>
					<span className="truncate text-[10px] text-muted-foreground ml-0!">
						{user.color}
					</span>
				</div>
			</Link>
		</Button>
	);
};
