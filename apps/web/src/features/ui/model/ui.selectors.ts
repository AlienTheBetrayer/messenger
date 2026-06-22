import { UiSliceVisibilityKey } from "@/features/ui/model/ui.lib";
import { RootState } from "@/shared";

export const selectVisibility = (
	state: RootState,
	key: UiSliceVisibilityKey,
) => {
	return state.ui.visibility[key];
};
