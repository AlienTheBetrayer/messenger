import { Fragment } from "react/jsx-runtime";

import { useGetGroupsQuery } from "@/features/connections/model/sessionGroup.api";
import { Group } from "@/features/connections/ui/group/Group";
import { Separator } from "@/shared";

export const GroupList = () => {
	// redux
	const { data: groups, isLoading } = useGetGroupsQuery();

	if (isLoading) {
		return (
			<div className="flex flex-col gap-0.5! p-2!">
				{Array.from({ length: 4 }, (_, i) => (
					<div
						key={i}
						className="h-8 w-full skeleton rounded-sm!"
					/>
				))}
			</div>
		);
	}

	if (!groups?.ids.length) {
		return null;
	}

	// jsx
	return (
		<ul className="w-full flex flex-col max-h-42 scrollbar-none overflow-y-auto pb-4">
			{groups.ids.map((groupId) => (
				<Fragment key={groupId}>
					<li>
						<Group groupId={groupId} />
					</li>

					<li>
						<Separator />
					</li>
				</Fragment>
			))}
		</ul>
	);
};
