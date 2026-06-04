import { RedirectPopupVariants } from "@/features/auth/lib/variants";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	useQueryState,
} from "@/shared";

export const AuthRedirectPopup = () => {
	// states
	const [error, setError] = useQueryState("error");

	// ui states
	const errorCode = error?.toUpperCase();
	const variant =
		errorCode && errorCode in RedirectPopupVariants
			? RedirectPopupVariants[errorCode as keyof typeof RedirectPopupVariants]
			: null;

	// jsx
	return (
		<Dialog
			open={!!error}
			onOpenChange={(open) => {
				if (!open) {
					setError(null);
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{variant?.title ?? "Authentication error."}</DialogTitle>
					<DialogDescription>
						{variant?.description ??
							"Authentication redirected with an unknown error. Please try again."}
					</DialogDescription>
				</DialogHeader>

				{variant?.content && <p>{variant.content}</p>}

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
