/**
 * initial + types
 */
export type UiSliceInitialType = {
	connectSessions: {
		awaiting: { groupId: string } | null;
	};
};

export const UiSliceInitial = {
	connectSessions: {
		awaiting: null,
	},
} as UiSliceInitialType;
