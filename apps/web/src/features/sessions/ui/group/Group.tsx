import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { useGroupActions } from "@/features/sessions/hooks/useGroupActions";
import { groupSelectors } from "@/features/sessions/model/sessionGroup.api";
import { ConnectedSessionList } from "@/features/sessions/ui/connectedsession/ConnectedSessionList";
import {
	Button,
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerFooter,
	EmojiPickerSearch,
	Item,
	ItemContent,
	ItemHeader,
	ItemTitle,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useAppSelector,
} from "@/shared";

export const Group = ({ groupId }: { groupId: string }) => {
	// redux
	const group = useAppSelector((state) =>
		groupSelectors.selectById(state, groupId),
	);
	const { editGroup, deleteGroup } = useGroupActions();

	// states
	const [open, setOpen] = useState<boolean>(false);

	// fallback
	if (!group) {
		return null;
	}

	// jsx
	return (
		<Item>
			<ItemHeader>
				<ItemTitle className="flex flex-row items-center gap-1">
					<Popover
						open={open}
						onOpenChange={setOpen}
					>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								className="not-hover:bg-muted/50 aspect-square"
								size="xs"
							>
								{group.emoji}
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<EmojiPicker
								sticky={false}
								className="h-[300px]"
								onEmojiSelect={({ emoji }) => {
									setOpen(false);
									editGroup({ emoji, groupId: group.id });
								}}
							>
								<EmojiPickerSearch />
								<EmojiPickerContent />
								<EmojiPickerFooter />
							</EmojiPicker>
						</PopoverContent>
					</Popover>
					<span>{group.title}</span>
				</ItemTitle>

				<ul className="flex items-center">
					<li>
						<Button
							className="ml-auto! aspect-square"
							size="xs"
							variant="ghost"
						>
							<Plus />
						</Button>
					</li>

					<li>
						<Button
							className="ml-auto! aspect-square"
							size="xs"
							variant="destructive"
							onClick={() => {
								deleteGroup({ groupId: group.id });
							}}
						>
							<Trash2 />
						</Button>
					</li>
				</ul>
			</ItemHeader>

			<ItemContent>
				<ConnectedSessionList connectedSessionIds={group.connectedSessionIds} />
			</ItemContent>
		</Item>
	);
};
