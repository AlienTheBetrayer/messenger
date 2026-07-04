import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	status:
		| {
				userId: string;
				sessionId: string;
		  }
		| undefined
		| null;
};

const initialState: InitialState = {
	status: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (
			state,
			payload: PayloadAction<{ userId: string; sessionId: string } | null>,
		) => ({ ...state, status: payload.payload }),
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
