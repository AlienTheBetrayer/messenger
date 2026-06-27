import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGroupActions } from "@/features/sessions/hooks/useGroupActions";
import { groupSelectors } from "@/features/sessions/model/sessionGroup.api";
import { ConnectedSessionList } from "@/features/sessions/ui/connectedsession/ConnectedSessionList";
import { CreateGroupPopover } from "@/features/sessions/ui/group/CreateGroupFormPopover";
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
	const auth = useAuth();
	const { editGroup, deleteGroup } = useGroupActions();

	// states
	const [open, setOpen] = useState<boolean>(false);

	// fallback
	if (!group) {
		return null;
	}

	// jsx
	return (
		<Item className="p-2">
			<ItemHeader>
				<ItemTitle className="flex flex-row items-center gap-0">
					<Popover
						open={open}
						onOpenChange={setOpen}
					>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								className=" aspect-square"
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

					<span className="text-xs">{group.title}</span>
				</ItemTitle>

				{group.owner_user_id === auth?.user.id && (
					<ul className="flex items-center">
						<li>
							<Button
								className="ml-auto! aspect-square"
								size="xs"
								variant="ghost"
							>
								<Plus className="size-4" />
							</Button>
						</li>

						<li>
							<CreateGroupPopover params={{ type: "edit", groupId: group.id }}>
								<Button
									className="aspect-square"
									size="xs"
									variant="ghost"
								>
									<Pencil />
								</Button>
							</CreateGroupPopover>
						</li>

						<li>
							<Button
								className="aspect-square"
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
				)}
			</ItemHeader>

			<ItemContent>
				<ConnectedSessionList connectedSessionIds={group.connectedSessionIds} />
			</ItemContent>
		</Item>
	);
};
