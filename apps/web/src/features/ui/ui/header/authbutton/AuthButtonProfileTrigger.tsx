"use client";

import Image from "next/image";

import { connectionsApi } from "@/features/connections/model/connections.api";
import { selectConnectSessionsCollapsedMenu } from "@/features/ui/model/local.selectors";
import { useHeaderProvider } from "@/features/ui/providers/HeaderProvider";
import { Button, PopoverTrigger } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const AuthButtonProfileTrigger = () => {
	// redux
	const prefetch = connectionsApi.usePrefetch("getConnections");
	const collapsedMenu = useAppSelector(selectConnectSessionsCollapsedMenu);

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
				onPointerEnter={() => {
					if (!collapsedMenu) {
						prefetch();
					}
				}}
			>
				<Image
					alt="pfp"
					src={auth.user.image_url}
					width={16}
					height={16}
					className="grayscale-100 group-hover:grayscale-0"
				/>
				<span className="text-xs max-w-16 truncate">{auth.user.username}</span>
			</Button>
		</PopoverTrigger>
	);
};
