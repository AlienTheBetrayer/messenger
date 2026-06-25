import { groupSelectors } from "@/features/sessions/model/sessionGroup.api";
import { Group } from "@/features/sessions/ui/group/Group";
import { useAppSelector } from "@/shared";

export const GroupList = () => {
	// redux
	const groupIds = useAppSelector(groupSelectors.selectIds);

	// jsx
	return (
		<ul className="w-full flex flex-col max-h-64 overflow-y-auto">
			{groupIds.map((groupId) => (
				<li key={groupId}>
          <Group groupId={groupId} />
				</li>
			))}
		</ul>
	);
};
