"use client";

import { Button, CardFooter, Spinner } from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const VerifyFooter = () => {
	// states
	const isLoading = useIsLoading(["login", "signup", "forgotPassword"]);

	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
				type="submit"
				variant="secondary"
				className="w-full"
			>
				{isLoading && <Spinner />}
				Verify
			</Button>
		</CardFooter>
	);
};
