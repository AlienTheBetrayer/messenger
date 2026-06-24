import { GroupFormSchema } from "@gravity/shared";
import { useCallback, useMemo } from "react";

export const useGroupLogic = () => {
	const createGroup = useCallback(async (data: GroupFormSchema) => {}, []);

	return useMemo(
		() => ({
			createGroup,
		}),
		[createGroup],
	);
};
