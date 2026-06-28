import { useCallback, useMemo } from "react";

import { useConnectionNotifications } from "@/features/connections/hooks/useConnectionNotifications";
import { useDeleteConnectionMutation } from "@/features/connections/model/sessionConnections.api";
import { normalizeError } from "@/shared";
import { ConnectionsDeleteSchema__ } from "@/shared/model/serializable.types";

export const useConnectionActions = () => {
	// redux
	const [connectionDelete] = useDeleteConnectionMutation();

	// notifications
	const notifications = useConnectionNotifications();

	// functions
	const deleteConnection = useCallback(
		async (data: ConnectionsDeleteSchema__) => {
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

	return useMemo(() => ({ deleteConnection }), [deleteConnection]);
};
