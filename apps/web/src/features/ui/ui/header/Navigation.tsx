"use client";

import Link from "next/link";

import { Icons } from "@/features/ui/lib";

export const Navigation = () => {
	return (
		<ul className="flex items-center">
			<li>
				<Link
					href="/"
					className="flex items-center gap-2.5 px-2 py-1 rounded-md text-foreground/90 hover:text-foreground outline-none transition-all duration-200 group relative select-none"
				>
					{/* Logo Icon Slot with micro-scale & background reflection aura */}
					<div className="relative h-6 w-6 rounded-lg border border-border/50 bg-muted/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-primary shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30 group-hover:bg-primary/5">
						<div className="*:size-3.5! flex items-center justify-center transition-transform duration-300 group-hover:rotate-3">
							{Icons.box}
						</div>
					</div>

					{/* Brand Wordmark and Beta-Badge Stack */}
					<div className="flex items-center gap-1.5">
						<span className="tracking-tighter font-bold text-sm bg-gradient-to-b from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
							outwave
						</span>

						{/* Minimal monolithic version pill */}
						<span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md border border-border/50 bg-muted/40 text-muted-foreground/60 scale-90 origin-left tracking-tight">
							beta
						</span>
					</div>
				</Link>
			</li>
		</ul>
	);
};
