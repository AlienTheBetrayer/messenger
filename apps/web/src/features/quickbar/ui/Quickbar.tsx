"use client";

import { Boxes, CirclePlus, Compass } from "lucide-react";
import Link from "next/link";

import { QuickbarButton } from "@/features/quickbar/ui/button/QuickbarButton";
import { Separator } from "@/shared";

export const Quickbar = () => {
	return (
		<ul className="flex flex-col items-center gap-1 w-full">
			<li className="w-full aspect-square">
				<QuickbarButton
					buttonProps={{ asChild: true }}
					tooltip="Direct messages"
				>
					<Link href="/app">
						<Boxes />
					</Link>
				</QuickbarButton>
			</li>

			<li className="flex justify-center w-full my-1">
				<Separator className="w-2/3!" />
			</li>

			<li className="w-full aspect-square">
				<QuickbarButton tooltip="Add a Server">
					<CirclePlus />
				</QuickbarButton>
			</li>

			<li className="w-full aspect-square">
				<QuickbarButton tooltip="Discover">
					<Compass />
				</QuickbarButton>
			</li>
		</ul>
	);
};
