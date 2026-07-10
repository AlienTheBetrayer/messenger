"use client";

import { Connections } from "@/features/connections/ui/Connections";
import { useFragment } from "@/shared/hooks/useFragment";
import { DialogWrapper } from "@/shared/ui";

export const ConnectionsDialog = () => {
	// fragment
	const fragment = useFragment();

	// jsx
	return (
		<DialogWrapper
			open={fragment.startsWith("connections")}
			onOpenChange={(state) => {
				if (!state) {
					fragment.toggle("connections");
				}
			}}
			title="Connections"
			description="View and modify your authenticated sessions."
			className="flex flex-col w-screen! sm:max-w-lg max-w-lg"
			content={<Connections groupClassName="max-h-100" />}
		/>
	);
};
