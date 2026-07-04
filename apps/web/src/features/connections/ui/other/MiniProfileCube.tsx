"use client";

import { Crown } from "lucide-react";
import Link from "next/link";

import { groupSelectors } from "@/features/connections/model/group.slice";
import { cn } from "@/features/ui";
import { InfoCube } from "@/features/users";
import { userSelectors } from "@/features/users/model/users.slice";
import { Button, ButtonProps } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const MiniProfileCube = ({
	userId,
	groupId,
	props,
}: {
	userId: string;
	groupId?: string;
	props?: ButtonProps;
}) => {
	// redux
	const user = useAppSelector((state) =>
		userSelectors.selectById(state, userId),
	);
	const group = useAppSelector(
		(state) =>
			(groupId && groupSelectors.selectById(state, groupId)) || undefined,
	);

	// fallback
	if (!user) {
		return null;
	}

	const { className, ...otherProps } = props ?? {};

	// jsx
	return (
		<Button
			variant="ghost"
			size="sm"
			asChild
			className={cn("grow w-full justify-start", className)}
			{...otherProps}
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
					<span className="flex gap-0.5 items-center truncate text-xs ml-0!">
						{group?.owner_user_id === userId && (
							<div className="rounded-sm bg-background/30 border border-primary/10 p-0.5">
								<Crown className="size-3.5" />
							</div>
						)}
						{user.username}
					</span>

					<span className="truncate text-[10px] text-muted-foreground ml-0!">
						{user.color}
					</span>
				</div>
			</Link>
		</Button>
	);
};
