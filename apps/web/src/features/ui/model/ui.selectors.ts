import { RootState } from "@/shared";

export const selectConnectionGroupId = (state: RootState) => {
	return state.ui.connectSessionPopup.groupId;
};
