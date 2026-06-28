import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGroupActions } from "@/features/connections/hooks/useGroupActions";
import { groupSelectors } from "@/features/connections/model/sessionGroup.api";
import { ConnectedSessionList } from "@/features/connections/ui/connectedsession/ConnectedSessionList";
import { CreateGroupPopover } from "@/features/connections/ui/group/CreateGroupFormPopover";
import {
	selectIsConnectSessionsAwaiting,
	toggleConnectSessionsAwaitingGroupId,
} from "@/features/ui";
import { DeleteConnectionMessageBox } from "@/features/ui/ui/messageboxes/DeleteConnectionMessageBox";
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
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	useAppDispatch,
	useAppSelector,
} from "@/shared";

export const Group = ({ groupId }: { groupId: string }) => {
	// redux
	const dispatch = useAppDispatch();
	const group = useAppSelector((state) =>
		groupSelectors.selectById(state, groupId),
	);
	const awaitingGroup = useAppSelector((state) =>
		selectIsConnectSessionsAwaiting(state, groupId),
	);

	const auth = useAuth();

	// actions
	const { editGroup, deleteGroup } = useGroupActions();

	// states
	const [open, setOpen] = useState<boolean>(false);

	// fallback
	if (!group) {
		return null;
	}

	// jsx
	return (
		<Item
			className="p-2 rounded-none"
			variant={awaitingGroup ? "muted" : "default"}
		>
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

				{group.owner_user_id === auth?.user.id && (
					<ul className="flex items-center">
						<li>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										className="ml-auto! aspect-square"
										size="xs"
										variant="ghost"
										onClick={() => {
											dispatch(
												toggleConnectSessionsAwaitingGroupId({
													groupId: group.id,
												}),
											);
										}}
									>
										{awaitingGroup ? (
											<RotateCcw />
										) : (
											<Plus className="size-4" />
										)}
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<span>
										{awaitingGroup
											? "Exit adding a session"
											: "Enter adding a session mode"}
									</span>
								</TooltipContent>
							</Tooltip>
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
							<DeleteConnectionMessageBox
								type="group"
								onConfirm={() => {
									deleteGroup({ groupId: group.id });
								}}
							>
								<Button
									className="aspect-square"
									size="xs"
									variant="destructive"
								>
									<Trash2 />
								</Button>
							</DeleteConnectionMessageBox>
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
