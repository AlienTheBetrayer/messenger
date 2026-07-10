import { RootState } from "@/shared/model/redux.types";

export const selectUserByUsername = (state: RootState, username: string) => {
	const usersState = state.users;
	const id = (usersState.idByUsername ?? {})[username];
	return id ? usersState.entities[id] : undefined;
};
