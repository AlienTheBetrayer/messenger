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
				paddingLeft: `${depth}rem`,
			}}
		>
      {Object.entries(items).map(([key, item]) => {
        // elements
				const Text = (
					<span className={item.highlighted ? "" : "text-muted-foreground"}>
						{item.text}
					</span>
				);

				// no children - show link
				if (!item.children) {
					return (
						<Button
							asChild
							variant="link"
							key={item.href}
							className="justify-start pl-0"
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
					>
						<AccordionTrigger
							onClick={() => {
								params?.onSelect(item);
							}}
						>
              {Text}
						</AccordionTrigger>

						{item.children && (
							<AccordionContent>
								{renderTree(params, item.children, depth + 1)}
							</AccordionContent>
						)}
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};
