"use client";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthFooterServiceButtons } from "@/features/auth/ui/auth/AuthFooterServiceButtons";
import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import { Button, CardFooter, Spinner } from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";
import { useAppSelector } from "@/shared/model/redux.hooks";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
	// redux
	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// states
	const { type } = useAuthFormProvider();
	const isLoading = useIsLoading(["getCode"]);
	const fragment = useFragment();

	// jsx
	return (
		<CardFooter className="flex flex-col gap-0!">
			<Button
				disabled={
					fragment.isAny(
						"login/verify",
						"signup/verify",
						"forgot_password/verify",
					) || isLoading
				}
				type="submit"
				variant={awaitingGroup ? "outline" : "default"}
				className="w-full"
				form="auth-form"
			>
				{isLoading ? (
					<Spinner />
				) : (
					<span>
						Continue {awaitingGroup ? `in ${awaitingGroup.emoji}` : ""}
					</span>
				)}
			</Button>

			{type !== "forgot_password" && <AuthFooterServiceButtons />}
		</CardFooter>
	);
};
