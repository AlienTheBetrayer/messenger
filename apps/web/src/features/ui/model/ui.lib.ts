/**
 * initial + types
 */
export const UiSliceInitial = {
	visibility: {
		sessionAddPopup: false,
	} as Record<string, boolean>,
};

export type UiSliceVisibilityKey = keyof (typeof UiSliceInitial)["visibility"];
