import Link from "next/link";

import { Button, DialogClose, DialogFooter } from "@/shared";

export const ProfileDialogFooter = () => {
	return (
		<DialogFooter>
			<DialogClose asChild>
				<Button asChild>
					<Link href="/profile/edit">Edit profile</Link>
				</Button>
			</DialogClose>
		</DialogFooter>
	);
};
