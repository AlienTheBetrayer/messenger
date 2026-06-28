import { generateId, GroupFormSchema } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useConnectionNotifications } from "@/features/connections/hooks/useConnectionNotifications";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useEditGroupMutation,
} from "@/features/connections/model/sessionGroup.api";
import { normalizeError } from "@/shared";

export const useGroupActions = () => {
	// redux
	const [groupCreate] = useCreateGroupMutation();
	const [groupEdit] = useEditGroupMutation();
	const [groupDelete] = useDeleteGroupMutation();

	// notifications
	const notifications = useConnectionNotifications();

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

	const deleteGroup = useCallback(
		async (data: { groupId: string }) => {
			const fn = async () => {
				try {
					const res = await groupDelete(data).unwrap();
					return res;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.groupDelete(fn);
		},
		[groupDelete, notifications],
	);

	return useMemo(
		() => ({
			createGroup,
			editGroup,
			deleteGroup,
		}),
		[createGroup, editGroup, deleteGroup],
	);
};
