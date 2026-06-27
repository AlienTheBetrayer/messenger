import { Trash2Icon } from "lucide-react";

import { Icons } from "@/features/ui/lib";
import { Button, MessageBox } from "@/shared";

export const DeleteConnectionMessageBox = ({
	children,
	type,
	onConfirm,
}: {
	children: React.ReactNode;
	type: "group" | "connection";
	onConfirm: () => void;
}) => {
	// ui states
	const ui =
		type === "group"
			? {
					description:
						"This will delete the group and all connections, users will stay logged in but won't be able to relogin.",
					title: "Delete the group?",
				}
			: {
					description:
						"This will disconnect this individual session, the user won't be able to see this list and relogin.",
					title: "Disconnect the session?",
				};

	// jsx
	return (
		<MessageBox
			variant="destructive"
			actionText="Wipe"
			icon={Icons.trash}
			onConfirm={onConfirm}
			title={ui.title}
			description={ui.description}
		>
			{children ?? (
				<Button
					variant="destructive"
					size="sm"
					className="gap-1.5 aspect-square"
				>
					<Trash2Icon />
				</Button>
			)}
		</MessageBox>
	);
};
