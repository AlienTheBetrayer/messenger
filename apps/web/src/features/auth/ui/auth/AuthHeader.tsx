import { X } from "lucide-react";

import { AuthFormVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { selectConnectSessionsAwaitingGroupId } from "@/features/ui/model/ui.selectors";
import { setConnectSessionsAwaitingGroupId } from "@/features/ui/model/ui.slice";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";
import { useAppDispatch, useAppSelector } from "@/shared/model/redux.hooks";

export const AuthHeader = () => {
	// redux
	const awaitingGroup = useAppSelector(
		(state) => !!selectConnectSessionsAwaitingGroupId(state),
	);
	const dispatch = useAppDispatch();

	// states
	const { type } = useAuthFormProvider();

	// ui states
	const variant = AuthFormVariants[type];
	const fragment = useFragment();

	// jsx
	return (
		<CardHeader>
			<CardTitle>{variant.title}</CardTitle>
			<CardDescription>{variant.description}</CardDescription>

			<CardAction className="flex">
				{awaitingGroup && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="destructive"
								onClick={() => {
									fragment.set("login");
									dispatch(setConnectSessionsAwaitingGroupId(null));
								}}
							>
								<X />
								Exit
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<span>Exit add session flow</span>
						</TooltipContent>
					</Tooltip>
				)}

				<Button
					variant="link"
					type="button"
					onClick={() => {
						fragment.set(type === "login" ? "signup" : "login");
					}}
				>
					{type === "login" ? "Sign up" : "Log in"}
				</Button>
			</CardAction>
		</CardHeader>
	);
};
