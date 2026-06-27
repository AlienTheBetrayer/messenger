/**
 * initial + types
 */
export type LocalSliceInitialType = {
	connectSessions: {
		collapsedMenu: boolean;
	};
};

export const LocalSliceInitial = {
	connectSessions: {
		collapsedMenu: false,
	},
} as LocalSliceInitialType;
