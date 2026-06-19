"use client";

import { FileText, Folder } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  SettingsNavigationItem,
  SettingsNavigationTree,
} from "@/features/settings/lib/tree";
import { cn } from "@/features/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared";

export const useNavigationTree = () => {
	const router = useRouter();
	const pathname = usePathname();

	/**
	 * rcursively renders the tree elements using Radix primitives with enhanced styling
	 */
	const renderTree = useCallback(
		function render(
			params?: {
				onSelect: (item: SettingsNavigationItem) => void;
			},
			items: Record<string, SettingsNavigationItem> = SettingsNavigationTree,
			depth: number = 0,
		) {
			return (
				<Accordion
					type="single"
					collapsible
					className="w-full space-y-1"
				>
					{Object.entries(items).map(([_key, item]) => {
						const isActive = item.href === pathname;
						const hasChildren = !!item.children;

						// Resolve dynamic styling classes
						const baseRowClass = cn(
							"flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-all group no-underline!",
							isActive
								? "bg-secondary text-secondary-foreground"
								: item.highlighted
									? "text-foreground hover:bg-muted/80"
									: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
						);

						// Inner Content Wrapper
						const NodeContent = (
							<div className="flex items-center gap-2.5 min-w-0">
								{/* Dynamically fallback to standard icons if item doesn't provide one */}
								{hasChildren ? (
									<Folder
										className={cn(
											"h-4 w-4 shrink-0 opacity-70 transition-transform group-data-[state=open]:scale-105",
											isActive ? "text-primary" : "",
										)}
									/>
								) : (
									<FileText
										className={cn(
											"h-4 w-4 shrink-0 opacity-60",
											isActive ? "text-primary" : "",
										)}
									/>
								)}
								<span className="truncate">{item.text}</span>
							</div>
						);

						// Leaf Node (No Children) -> Pure Link
						if (!hasChildren) {
							return (
								<Link
									href={item.href}
									key={item.href}
									className={baseRowClass}
								>
									{NodeContent}
								</Link>
							);
						}

						// Expandable Node (With Children) -> Accordion Structure
						return (
							<AccordionItem
								value={item.href}
								key={item.href}
								className="border-b-0!"
							>
								<AccordionTrigger
									className={cn(
										baseRowClass,
										"justify-between [&[data-state=open]>svg.chevron]:rotate-90",
									)}
									onClick={(e) => {
										// Prevent trigger from running if path selection handles navigation directly
										params?.onSelect(item);
									}}
								>
									{NodeContent}
								</AccordionTrigger>

								<AccordionContent className="pb-0 pt-1">
									<div className="flex relative pl-3">
										{/* Clean, minimalist vertical nesting guide wire */}
										<div className="absolute left-3.75 top-0 bottom-1 w-px bg-border/60 rounded" />

										<div className="flex flex-col w-full pl-4">
											{render(params, item.children, depth + 1)}
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			);
		},
		[pathname],
	);

	const jsx = useMemo(() => {
		return renderTree({
			onSelect: (item) => {
				router.push(item.href);
			},
		});
	}, [renderTree, router]);

	return useMemo(() => ({ jsx }), [jsx]);
};
