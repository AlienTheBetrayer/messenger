"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { connectionsApi } from "@/features/connections/model/connections.api";
import { selectConnectSessionsCollapsedMenu } from "@/features/ui/model/local.selectors";
import { Button } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const AuthButtons = () => {
	// redux
	const auth = useAuth();
	const collapsedMenu = useAppSelector(selectConnectSessionsCollapsedMenu);
	const prefetch = connectionsApi.usePrefetch("getConnections");

	// if logged in
	if (auth?.user.id) {
		return (
			<Button
				variant="ghost"
				className="group h-full"
				onPointerEnter={() => {
					if (!collapsedMenu) {
						prefetch();
					}
				}}
				asChild
			>
				<Link href="/connections">
					<Image
						alt="pfp"
						src={auth.user.image_url}
						width={14}
						height={14}
						className="grayscale-100 group-hover:grayscale-0"
					/>
					<span className="text-xs max-w-16 truncate">
						{auth.user.username}
					</span>
				</Link>
			</Button>
		);
	}

	// not logged in
	return (
		<ul className="flex items-center gap-0.5 h-full">
			<li className="h-full">
				<Button
					asChild
					variant="ghost"
					size="sm"
					className="h-full text-xs font-medium text-muted-foreground hover:text-foreground"
				>
					<Link href="/login">Log in</Link>
				</Button>
			</li>

			<li className="h-full">
				<Button
					asChild
					size="sm"
					className="h-full text-xs font-medium shadow-sm"
				>
					<Link href="/signup">Sign up</Link>
				</Button>
			</li>
		</ul>
	);
};
