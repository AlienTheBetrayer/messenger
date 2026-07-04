import { PickRequired } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useGetCodeMutation } from "@/features/auth/model/auth.api";
import { useConnectionNotifications } from "@/features/connections/hooks/useConnectionNotifications";
import {
	useAddConnectionMutation,
	useDeleteConnectionMutation,
	useGetConnectionCodeMutation,
	useLoginConnectionMutation,
} from "@/features/connections/model/connections.api";
import { normalizeError } from "@/shared";
import {
	ConnectionAddSchema__,
	ConnectionCodeSchema__,
	ConnectionDeleteSchema__,
	ConnectionLoginSchema__,
} from "@/shared/model/serializable.types";

export const useConnectionActions = () => {
	// redux
	const [connectionDelete] = useDeleteConnectionMutation();
	const [connectionAdd] = useAddConnectionMutation();
	const [connectionLogin] = useLoginConnectionMutation();
	const [connectionGetCode] = useGetConnectionCodeMutation();

	// notifications
	const notifications = useConnectionNotifications();

	// functions
	const getCode = useCallback(
		async (data: ConnectionCodeSchema__) => {
			const fn = async () => {
				try {
					const res = await connectionGetCode(data).unwrap();
					return res;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.connectionCode(fn);
		},
		[notifications, connectionGetCode],
	);

	const deleteConnection = useCallback(
		async (data: ConnectionDeleteSchema__) => {
			const fn = async () => {
				try {
					const res = await connectionDelete(data).unwrap();
					return res;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.connectionDelete(fn);
		},
		[notifications, connectionDelete],
	);

	const loginConnection = useCallback(
		async (data: ConnectionLoginSchema__) => {
			const fn = async () => {
				try {
					const ret = await connectionLogin(data).unwrap();
					return ret;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.connectionLogin(fn);
		},
		[notifications, connectionLogin],
	);

	const addConnection = useCallback(
		async (data: PickRequired<ConnectionAddSchema__, "connectionId">) => {
			const fn = async () => {
				try {
					const ret = await connectionAdd(data).unwrap();
					return ret;
				} catch (e) {
					const message = normalizeError(e);
					throw new Error(message);
				}
			};

			notifications.connectionAdd(fn);
		},
		[notifications, connectionAdd],
	);

	return useMemo(
		() => ({ getCode, deleteConnection, loginConnection, addConnection }),
		[deleteConnection, loginConnection, addConnection, getCode],
	);
};
