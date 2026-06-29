"use client";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthFooterServiceButtons } from "@/features/auth/ui/auth/AuthFooterServiceButtons";
import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import {
	Button,
	CardFooter,
	queryStateHooks,
	Spinner,
	useAppSelector,
} from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
	// redux
	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// states
	const { type } = useAuthFormProvider();
	const isLoading = useIsLoading(["getCode"]);
	const [verify] = queryStateHooks.useVerify();

	// jsx
	return (
		<CardFooter className="flex flex-col gap-0!">
			<Button
				disabled={!!verify || isLoading}
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
