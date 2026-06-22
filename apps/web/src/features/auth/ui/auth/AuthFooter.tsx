"use client";

import { AuthFooterServiceButtons } from "@/features/auth/ui/auth/AuthFooterServiceButtons";
import {
	Button,
	CardFooter,
	queryStateHooks,
	Separator,
	Spinner,
} from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
	// redux

	const isLoading = useIsLoading(["getCode"]);

	// states
	const [authType] = queryStateHooks.useAuthType();

	// jsx
	return (
		<CardFooter className="flex flex-col gap-5 px-6 pt-0 pb-8 mt-1 border-t border-border/40 bg-muted/10">
			<div className="w-full pt-6">
				<Button
					disabled={authType === "verify-pending" || isLoading}
					type="submit"
					size="lg"
					className="w-full h-11 text-sm font-semibold shadow-md shadow-primary/10 gap-2 focus-visible:ring-primary/40 group"
					form="auth-form"
				>
					{isLoading ? (
						<Spinner className="size-4 text-primary-foreground/70" />
					) : (
						<span>Continue</span>
					)}
				</Button>
			</div>



				<AuthFooterServiceButtons />
		</CardFooter>
	);
};
