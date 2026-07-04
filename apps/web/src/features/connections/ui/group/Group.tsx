import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGroupActions } from "@/features/connections/hooks/useGroupActions";
import { groupSelectors } from "@/features/connections/model/group.slice";
import { ConnectedSessionList } from "@/features/connections/ui/connectedsession/ConnectedSessionList";
import { CreateGroupPopover } from "@/features/connections/ui/group/CreateGroupFormPopover";
import { selectIsConnectSessionsAwaiting } from "@/features/ui/model/ui.selectors";
import { toggleConnectSessionsAwaitingGroupId } from "@/features/ui/model/ui.slice";
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
} from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/model/redux.hooks";

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
			className="p-2 rounded-none bg-linear-to-r from-card to-background/30"
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
								size="xs"
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
										variant={awaitingGroup ? "destructive" : "ghost"}
										asChild={!awaitingGroup}
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
											<Link href="/login">
												<Plus className="size-4" />
											</Link>
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
				<ConnectedSessionList groupId={groupId} />
			</ItemContent>
		</Item>
	);
};
