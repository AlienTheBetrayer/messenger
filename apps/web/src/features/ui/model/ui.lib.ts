/**
 * initial + types
 */
export type UiSliceInitialType = {
	connectSessions: {
		awaitingGroupId: string | undefined;
	};
};

export const UiSliceInitial = {
	connectSessions: {
		awaitingGroupId: undefined,
	},
} as UiSliceInitialType;
