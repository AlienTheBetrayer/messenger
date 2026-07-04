"use client";

import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import { Button, CardFooter, Spinner } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const VerifyFooter = () => {
	// redux
	const isLoading = useIsLoading(["login", "signup", "forgotPassword"]);
	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
				disabled={isLoading}
				type="submit"
				variant={awaitingGroup ? "outline" : "default"}
				className="w-full"
			>
				{isLoading ? (
					<Spinner />
				) : (
					<span>Verify {awaitingGroup ? `in ${awaitingGroup.emoji}` : ""}</span>
				)}
			</Button>
		</CardFooter>
	);
};
