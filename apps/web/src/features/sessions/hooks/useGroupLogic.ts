import { generateId, GroupFormSchema } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useSessionNotifications } from "@/features/sessions/hooks/useSessionNotifications";
import { useCreateGroupMutation } from "@/features/sessions/model/sessionGroup.api";
import { normalizeError } from "@/shared";

export const useGroupLogic = () => {
	// redux
	const [groupCreate] = useCreateGroupMutation();
	const notifications = useSessionNotifications();

	// functions
	const createGroup = useCallback(
		async (data: GroupFormSchema) => {
			const fn = async () => {
				try {
					const res = await groupCreate({
						groupId: generateId(),
						connectionId: generateId(),
						...data,
					}).unwrap();
					return res;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.groupCreate(fn);
		},
		[groupCreate, notifications],
	);

	return useMemo(
		() => ({
			createGroup,
		}),
		[createGroup],
	);
};
