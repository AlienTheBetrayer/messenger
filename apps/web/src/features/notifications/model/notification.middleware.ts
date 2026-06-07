import { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { notificationSlice } from "@/features/notifications/model/notification.slice";

export const notificationMiddleware: Middleware =
	(store) => (next) => (action) => {
		const result = next(action);


		return result;
	};
