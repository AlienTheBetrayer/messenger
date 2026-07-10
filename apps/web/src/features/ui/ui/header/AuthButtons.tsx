"use client";

import Image from "next/image";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { connectionsApi } from "@/features/connections/model/connections.api";
import { selectConnectSessionsCollapsedMenu } from "@/features/ui/model/local.selectors";
import { Button } from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const AuthButtons = () => {
	// redux
	const auth = useAuth();
	const collapsedMenu = useAppSelector(selectConnectSessionsCollapsedMenu);
	const prefetch = connectionsApi.usePrefetch("getConnections");

	// hash
	const fragment = useFragment();

	// if logged in
	if (auth?.user.id) {
		return (
			<Button
				variant="ghost"
				className="group h-full"
				onClick={() => {
					fragment.set("connections");
				}}
				onPointerEnter={() => {
					if (!collapsedMenu) {
						prefetch();
					}
				}}
				size="xs"
			>
				<Image
					alt="pfp"
					src={auth.user.image_url}
					width={14}
					height={14}
					className="grayscale-100 group-hover:grayscale-0"
				/>
				<span className="text-xs max-w-24 truncate">{auth.user.username}</span>
			</Button>
		);
	}

	// not logged in
	return (
		<ul className="flex items-center gap-0.5 h-full">
			<li className="h-full">
				<Button
					variant="ghost"
					size="xs"
					className="h-full text-xs"
					onClick={() => {
						fragment.set("login");
					}}
				>
					Log in
				</Button>
			</li>

			<li className="h-full">
				<Button
					size="xs"
					className="h-full text-xs"
					onClick={() => {
						fragment.set("signup");
					}}
				>
					Sign up
				</Button>
			</li>
		</ul>
	);
};
