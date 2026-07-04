import { Fragment } from "react/jsx-runtime";

import { useGetConnectionsQuery } from "@/features/connections/model/connections.api";
import { groupSelectors } from "@/features/connections/model/group.slice";
import { Group } from "@/features/connections/ui/group/Group";
import { Separator } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const GroupList = () => {
	// redux
	const { isLoading } = useGetConnectionsQuery();
	const groupIds = useAppSelector((state) => groupSelectors.selectIds(state));

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

	if (!groupIds.length) {
		return null;
	}

	// jsx
	return (
		<ul className="w-full flex flex-col max-h-42 scrollbar-none overflow-y-auto pb-4">
			{groupIds.map((groupId) => (
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
