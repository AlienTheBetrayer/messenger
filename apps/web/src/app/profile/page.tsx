import { ProfileProvider } from "@/features/profile/providers/ProfileProvider";
import { ProfileEdit } from "@/features/profile/ui/editing/ProfileEdit";

export default function ProfilePage() {
	return (
		<ProfileProvider>
			<ProfileEdit />
		</ProfileProvider>
	);
}
