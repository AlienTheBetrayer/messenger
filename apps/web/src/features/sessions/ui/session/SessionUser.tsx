import { usersSelectors } from "@/features/users/model/users.api";
import { InfoCube } from "@/features/users/ui/profile/dialog/InfoCube";
import { useAppSelector } from "@/shared";

export const SessionUser = ({ userId }: { userId: string }) => {
	// redux
	const user = useAppSelector((state) =>
		usersSelectors.selectById(state, userId),
	);

	// fallback
	if (!user) {
		return null;
	}

	// jsx
	return <InfoCube image={user.image_url} />;
};
