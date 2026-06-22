"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
	SettingsNavigationItem,
	SettingsNavigationTree,
} from "@/features/settings/lib/tree";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shared";

export const useNavigationTree = () => {
	// setup
	const router = useRouter();
	const pathname = usePathname();

	/**
	 * determines colors for navigation item styles
	 * @param item navigation item
	 * @returns regular color and hover color
	 */
	const determineColors = useCallback(
		(item: SettingsNavigationItem) => {
			if (item.href === pathname) {
				return {
					color: "var(--blue-secondary)",
					hover: "var(--blue-muted)",
				};
			}

			if (item.highlighted) {
				return {
					color: "var(--foreground)",
					hover: "var(--foreground)",
				};
			} else {
				return {
					color: "var(--muted-foreground)",
					hover: "var(--foreground)",
				};
			}
		},
		[pathname],
	);

	/**
	 *
	 * @param items tree to render
	 * @returns
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
					style={{
						paddingLeft: `${depth * 0.75}rem`,
					}}
				>
					{Object.entries(items).map(([_key, item]) => {
						// elements
						const { color, hover } = determineColors(item);

						const Text = (
							<span
								style={
									{ "--color": color, "--hover": hover } as React.CSSProperties
								}
								className="text-(--color) group-hover:text-(--hover)"
							>
								{item.text}
							</span>
						);
						const RowClass =
							"flex items-center justify-start pl-0 py-1.5 min-h-8 leading-none group no-underline!";

						// no children - show link
						if (!item.children) {
							return (
								<Link
									href={item.href}
									key={item.href}
									className={RowClass}
								>
									{Text}
								</Link>
							);
						}

						// children - render tree
						return (
							<AccordionItem
								value={item.href}
								key={item.href}
								className="border-b-0!"
							>
								<AccordionTrigger
									className={RowClass}
									onClick={() => {
										params?.onSelect(item);
									}}
								>
									{Text}
								</AccordionTrigger>

								{item.children && (
									<AccordionContent>
										<div className="flex">
											<div className="border grow w-px rounded-2xl mx-2" />
											<div className="flex flex-col w-full">
												{render(params, item.children, depth + 1)}
											</div>
										</div>
									</AccordionContent>
								)}
							</AccordionItem>
						);
					})}
				</Accordion>
			);
		},
		[determineColors],
	);

	/**
	 * generated jsx
	 */
	const jsx = useMemo(() => {
		return renderTree({
			onSelect: (item) => {
				router.push(item.href);
			},
		});
	}, [renderTree, router]);

	return useMemo(() => ({ jsx }), [jsx]);
};
