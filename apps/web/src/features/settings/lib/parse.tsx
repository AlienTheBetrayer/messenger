import Link from "next/link";

import {
	SettingsNavigationItem,
	SettingsNavigationTree,
} from "@/features/settings/lib/tree";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
} from "@/shared";

/**
 *
 * @param items tree to render
 * @returns
 */
export const renderTree = (
	params?: {
		onSelect: (item: SettingsNavigationItem) => void;
	},
	items: Record<string, SettingsNavigationItem> = SettingsNavigationTree,
	depth: number = 0,
) => {
	return (
		<Accordion
			type="single"
			collapsible
			style={{
				paddingLeft: `${depth * 0.75}rem`,
			}}
		>
			{Object.entries(items).map(([key, item]) => {
				// elements
				const Text = (
					<span
						className={`${item.highlighted ? "" : "text-muted-foreground"} group-hover:text-foreground`}
					>
						{item.text}
					</span>
				);
				const RowClass =
					"flex items-center justify-start pl-0 py-1.5 min-h-8 leading-none group no-underline!";

				// no children - show link
				if (!item.children) {
					return (
						<Button
							asChild
							variant="link"
							key={item.href}
							className={RowClass}
						>
							<Link href={item.href}>{Text}</Link>
						</Button>
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
									<div className="bg-secondary grow w-px rounded-2xl mx-2" />
									<div className="flex flex-col w-full">
										{renderTree(params, item.children, depth + 1)}
									</div>
								</div>
							</AccordionContent>
						)}
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};
