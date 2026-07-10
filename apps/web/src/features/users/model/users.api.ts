import { EntityState } from "@reduxjs/toolkit";

import { userActions } from "@/features/users/model/users.slice";
import { baseApi } from "@/shared/model/redux.store";
import {
	UserGetByUsernameSchema__,
	UserGetReturn__,
	UserGetSchema__,
	usersType__,
} from "@/shared/model/serializable.types";

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

		getUser: build.query<
			UserGetReturn__,
			UserGetSchema__ | UserGetByUsernameSchema__
		>({
			query: (body) => ({
				url:
					"username" in body
						? `/users/username/${body.username}`
						: `/users/id/${body.userId}`,
				method: "GET",
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (!data.user) {
						return;
					}

					dispatch(userActions.upsertOne(data.user));
				} catch {
					/** */
				}
			},
		}),
	}),
});

export const { useGetUserQuery } = usersApi;
