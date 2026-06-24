import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, DialogClose, DialogFooter } from "@/shared";

export const ProfileDialogFooter = () => {
	// other
	const router = useRouter();

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
