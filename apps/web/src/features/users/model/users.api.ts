import { EntityState } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/model/redux.store";
import { usersType__ } from "@/shared/model/serializable.types";

/**
 * api
 */
export const usersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<EntityState<usersType__, string>, void>({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
		}),
	}),
});
