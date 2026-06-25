import { usersSelectors } from "@/features/users/model/users.api";
import { InfoCube } from "@/features/users/ui/profile/dialog/InfoCube";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
	useAppSelector,
} from "@/shared";

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
	return (
		<Item variant="muted">
			<ItemMedia>
        <InfoCube image={user.image_url} color={user.color} />
			</ItemMedia>

			<ItemContent className="truncate">
				<ItemTitle>{user.username}</ItemTitle>
				<ItemDescription>{user.color}</ItemDescription>
			</ItemContent>
		</Item>
	);
};
