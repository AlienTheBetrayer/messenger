"use client";

import Link from "next/link";

import { Button } from "@/shared";

export const Navigation = () => {
	return (
		<ul className="flex gap-1">
			<li>
				<Button
					asChild
					variant="ghost"
				>
					<Link href="/">Home</Link>
				</Button>
			</li>
		</ul>
	);
};
