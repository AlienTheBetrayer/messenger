"use client";

import Link from "next/link";

import { Icons } from "@/features/ui/lib";

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-border/40 bg-muted/5 mt-auto select-none transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-10">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8">
					<div className="flex flex-col gap-3 col-span-2">
						<Link
							href="/"
							className="flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors group"
						>
							<div className="h-5 w-5 rounded bg-foreground text-background flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
								{Icons.box || "■"}
							</div>
							<span className="tracking-tighter font-bold text-sm">
								outwave
							</span>
						</Link>
						<p className="text-[11px] text-muted-foreground/70 max-w-[200px] leading-relaxed tracking-tight">
							The foundational routing and event orchestration network for
							scalable distributed software architectures.
						</p>
					</div>

					<div className="flex flex-col gap-2.5">
						<span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/40">
							Product
						</span>
						<ul className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground/80">
							<li>
								<Link
									href="/features"
									className="hover:text-foreground transition-colors"
								>
									Edge Infrastructure
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="hover:text-foreground transition-colors"
								>
									Pricing Tiers
								</Link>
							</li>
							<li>
								<Link
									href="/telemetry"
									className="hover:text-foreground transition-colors"
								>
									Global Analytics
								</Link>
							</li>
							<li>
								<Link
									href="/releases"
									className="hover:text-foreground transition-colors flex items-center gap-1.5"
								>
									Releases{" "}
									<span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 px-1 rounded-sm scale-90">
										v1.0
									</span>
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-2.5">
						<span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/40">
							Resources
						</span>
						<ul className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground/80">
							<li>
								<Link
									href="/docs"
									className="hover:text-foreground transition-colors"
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href="/api-reference"
									className="hover:text-foreground transition-colors"
								>
									API Reference
								</Link>
							</li>
							<li>
								<Link
									href="/guides"
									className="hover:text-foreground transition-colors"
								>
									Architecture Guides
								</Link>
							</li>
							<li>
								<Link
									href="/system-status"
									className="hover:text-foreground transition-colors"
								>
									Network Map
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-2.5">
						<span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/40">
							Company
						</span>
						<ul className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground/80">
							<li>
								<Link
									href="/about"
									className="hover:text-foreground transition-colors"
								>
									About Engine
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="hover:text-foreground transition-colors"
								>
									Engineering Blog
								</Link>
							</li>
							<li>
								<Link
									href="/careers"
									className="hover:text-foreground transition-colors"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="/legal"
									className="hover:text-foreground transition-colors"
								>
									Security & Trust
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="h-px w-full bg-border/40" />

				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground/50">
					<div className="flex items-center gap-2.5 order-2 sm:order-1">
						<span>© {currentYear} Outwave Inc.</span>
						<span className="text-border/60">/</span>
						<Link
							href="/privacy"
							className="hover:text-foreground transition-colors"
						>
							Privacy Policy
						</Link>
						<span className="text-border/60">/</span>
						<Link
							href="/terms"
							className="hover:text-foreground transition-colors"
						>
							Terms of Service
						</Link>
					</div>

					<div className="flex items-center gap-4 order-1 sm:order-2">
						<Link
							href="/status"
							className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-muted/40 text-muted-foreground/70 hover:text-foreground transition-all duration-200 group"
						>
							<span className="relative flex h-1 w-1">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500" />
							</span>
							<span>All Regions Operational</span>
						</Link>
						<span className="hidden md:inline select-none text-muted-foreground/30">
							Cluster Node: <span className="font-bold">US-EAST-1</span>
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
