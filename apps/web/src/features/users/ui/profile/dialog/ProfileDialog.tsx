"use client";

import { useRouter } from "next/navigation";

import { ProfileDialogContent } from "@/features/users/ui/profile/dialog/ProfileDialogContent";
import { ProfileDialogFooter } from "@/features/users/ui/profile/dialog/ProfileDialogFooter";
import { ProfileDialogHeader } from "@/features/users/ui/profile/dialog/ProfileDialogHeader";
import { Dialog, DialogContent } from "@/shared";

export const ProfileDialog = () => {
	// other
	const router = useRouter();
	// jsx
	return (
		<Dialog
			defaultOpen
			onOpenChange={(state) => {
				setTimeout(() => {
					router.back();
				}, 300);
			}}
		>
			<DialogContent
				showCloseButton={false}
				className="flex flex-col gap-5 w-screen max-w-lg"
			>
				<ProfileDialogHeader />
				<ProfileDialogContent />
				<ProfileDialogFooter />
			</DialogContent>
		</Dialog>
	);
};
