"use client";

import { Profile } from "@/features/users/ui/profile/Profile";
import { useFragment } from "@/shared/hooks/useFragment";
import { DialogWrapper } from "@/shared/ui";

export const ProfileDialog = () => {
	// fragment
	const fragment = useFragment();
	const value = fragment.getSegments();

	// jsx
	return (
		<DialogWrapper
			open={fragment.startsWith("profile")}
			onOpenChange={() => {
				fragment.toggle("profile");
			}}
			title="Profile"
			description="View and profile and make adjustments."
			className="flex flex-col w-screen! sm:max-w-lg max-w-lg"
			content={<Profile username={value?.[1] ? value[1] : null} />}
		/>
	);
};
