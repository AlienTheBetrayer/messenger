import { generateId, GroupFormSchema } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useSessionNotifications } from "@/features/sessions/hooks/useSessionNotifications";
import {
	useCreateGroupMutation,
	useEditGroupMutation,
} from "@/features/sessions/model/sessionGroup.api";
import { normalizeError } from "@/shared";

export const useGroupActions = () => {
	// redux
	const [groupCreate] = useCreateGroupMutation();
	const [groupEdit] = useEditGroupMutation();
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

	const editGroup = useCallback(
		async (data: Partial<GroupFormSchema> & { groupId: string }) => {
			const fn = async () => {
				try {
					const res = await groupEdit(data).unwrap();
					return res;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.groupEdit(fn);
		},
		[groupEdit, notifications],
	);

	return useMemo(
		() => ({
			createGroup,
			editGroup,
		}),
		[createGroup, editGroup],
	);
};
