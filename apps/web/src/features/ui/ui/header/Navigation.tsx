"use client";

import Link from "next/link";

import { Icons } from "@/features/ui/lib";
import { Button } from "@/shared";

export const Navigation = () => {
	return (
		<ul className="flex gap-1">
			<li>
				<Button
					asChild
					variant="ghost"
				>
					<Link href="/">
						<div className="*:size-4!">{Icons.box}</div>
						<span className="tracking-tight font-semibold">outwave</span>
					</Link>
				</Button>
			</li>
		</ul>
	);
};
