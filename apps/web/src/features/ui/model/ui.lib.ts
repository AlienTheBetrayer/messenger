/**
 * initial + types
 */
export type UiSliceInitialType = {
	connectSessionPopup: {
		groupId: string | undefined;
	};
};

export const UiSliceInitial = {
	connectSessionPopup: {
		groupId: undefined,
	},
} as UiSliceInitialType;
