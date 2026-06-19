"use client";

import Link from "next/link";

import { Icons } from "@/features/ui/lib";
import { Button } from "@/shared";

export default function HomePage() {
	return (
		<div className="relative min-h-screen w-full bg-background text-foreground flex flex-col items-center overflow-x-hidden antialiased transition-colors duration-300">
			{/* 1. Structural Architectural Grid System */}
			<div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-muted/20 via-muted/5 to-transparent pointer-events-none select-none" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))/0.12_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))/0.12_1px,transparent_1px)] bg-[size:24px_36px] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_40%,#000_50%,transparent_100%)] pointer-events-none select-none" />
			<div className="absolute inset-x-0 top-[40vh] h-px bg-gradient-to-r from-transparent via-border/30 to-transparent pointer-events-none" />

			{/* 2. Primary Layout Shell */}
			<main className="relative z-10 w-full max-w-5xl px-6 pt-24 md:pt-32 flex flex-col items-center text-center grow">
				{/* Release Status Flag */}
				<div className="animate-in fade-in slide-in-from-top-2 duration-500 ease-out inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border/60 bg-muted/30 backdrop-blur-sm select-none mb-6">
					<span className="relative flex h-1.5 w-1.5">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
						<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
					</span>
					<span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground/90">
						Outwave Engine Core v1.0 Live
					</span>
				</div>

				{/* Main Monolithic Headline */}
				<h1 className="animate-in fade-in slide-in-from-top-3 duration-600 ease-out text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-b from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent max-w-3xl leading-[1.05] mb-6">
					The global routing layer for real-time applications.
				</h1>

				{/* Secondary Subtitle Layer */}
				<p className="animate-in fade-in slide-in-from-top-4 duration-700 ease-out text-sm sm:text-base text-muted-foreground/80 max-w-xl tracking-tight leading-relaxed mb-8">
					Deploy programmatic telemetry interfaces, stream localized event
					blocks, and manage distributed network clusters through a single
					developer workspace.
				</p>

				{/* Action Trigger Row */}
				<div className="animate-in fade-in slide-in-from-top-4 duration-700 ease-out flex items-center gap-3 w-full justify-center mb-16">
					<Button
						asChild
						size="lg"
						className="h-10 text-xs font-semibold px-4 shadow-md shadow-primary/5 rounded-md"
					>
						<Link href="/auth">Deploy Pipeline</Link>
					</Button>

					<Button
						asChild
						variant="outline"
						size="lg"
						className="h-10 text-xs font-semibold px-4 bg-background border-border/50 hover:bg-muted/40 rounded-md group"
					>
						<Link
							href="/docs"
							className="flex items-center gap-1.5"
						>
							Documentation
							<span className="text-muted-foreground/50 group-hover:text-foreground transition-colors font-mono text-[10px]">
								⌘K
							</span>
						</Link>
					</Button>
				</div>

				{/* 3. The Active Live Terminal Node Block */}
				<div className="animate-in fade-in zoom-in-98 duration-1000 delay-100 ease-out w-full max-w-3xl rounded-xl border border-border/60 bg-muted/10 backdrop-blur-xs shadow-xl relative overflow-hidden group mb-24 select-none">
					<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] pointer-events-none rounded-xl" />

					{/* Terminal Title Bar */}
					<div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-muted/20">
						<div className="flex items-center gap-1.5">
							<div className="size-2 rounded-full bg-border/80" />
							<div className="size-2 rounded-full bg-border/40" />
							<div className="size-2 rounded-full bg-border/20" />
							<span className="text-[10px] font-mono text-muted-foreground/50 ml-2 tracking-tight">
								outwave ~ init --stream
							</span>
						</div>
						<span className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest">
							SECURE TLS 1.3
						</span>
					</div>

					{/* Code Stream Output Matrix */}
					<div className="p-5 text-left font-mono text-xs space-y-1.5 overflow-x-auto bg-background/40">
						<p className="text-muted-foreground/40">
							{"$ npm i @outwave/core && outwave initialize"}
						</p>
						<p className="text-emerald-400 flex items-center gap-2">
							<span className="text-muted-foreground/30">✔</span>
							<span>
								[outwave-core] Synchronized secure engine cluster state
								safely...
							</span>
						</p>
						<p className="text-foreground/80 pl-4">
							↳ Node Location:{" "}
							<span className="text-primary font-bold">edge_fra_1</span>{" "}
							(Frankfurt, DE)
						</p>
						<p className="text-foreground/80 pl-4">
							↳ Secure Key Array:{" "}
							<span className="text-muted-foreground/60">
								sig.verify.ecc.secp256k1
							</span>
						</p>
						<p className="text-muted-foreground/40 animate-pulse pl-4">
							⎋ Listening for edge execution requests...
						</p>
					</div>
				</div>

				{/* 4. The Value Metric/Feature Grid Layout */}
				<div className="w-full grid md:grid-cols-3 gap-6 text-left border-t border-border/40 pt-12 mb-24">
					<div className="space-y-1.5 group">
						<h3 className="text-xs font-semibold text-foreground tracking-tight flex items-center gap-2">
							<span className="text-primary shrink-0 size-3.5! flex items-center justify-center">
								{Icons.box || "■"}
							</span>
							Global Routing
						</h3>
						<p className="text-xs text-muted-foreground/70 leading-relaxed tracking-tight">
							Route data across regional memory cells without writing separate
							proxy logic. Edge layers handle compilation automatically.
						</p>
					</div>

					<div className="space-y-1.5 group">
						<h3 className="text-xs font-semibold text-foreground tracking-tight flex items-center gap-2">
							<span className="text-primary shrink-0 size-3.5! flex items-center justify-center">
								{Icons.settings || "⚙"}
							</span>
							Atomic Parameters
						</h3>
						<p className="text-xs text-muted-foreground/70 leading-relaxed tracking-tight">
							Validate inputs directly via hardware-level schemas. Zero-latency
							processing guarantees sub-millisecond handshake checks.
						</p>
					</div>

					<div className="space-y-1.5 group">
						<h3 className="text-xs font-semibold text-foreground tracking-tight flex items-center gap-2">
							<span className="text-primary shrink-0 size-3.5! flex items-center justify-center">
								{Icons.profile || "◆"}
							</span>
							Unified Identities
						</h3>
						<p className="text-xs text-muted-foreground/70 leading-relaxed tracking-tight">
							Sync user sessions directly to global state trees. Built natively
							to run smoothly over decentralized JWT configurations.
						</p>
					</div>
				</div>
			</main>

			{/* 5. System Status Footer Anchor */}
			<footer className="w-full border-t border-border/40 bg-muted/10 py-3 px-6 flex items-center justify-between text-[10px] font-mono text-muted-foreground/50 select-none">
				<span className="flex items-center gap-1.5">
					<span className="relative flex h-1 w-1">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
						<span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500" />
					</span>
					All global regions operational
				</span>
				<span>Build hash: 7e2a9b_outwave</span>
			</footer>
		</div>
	);
}
