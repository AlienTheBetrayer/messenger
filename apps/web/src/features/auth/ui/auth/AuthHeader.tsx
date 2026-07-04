import { X } from "lucide-react";
import Link from "next/link";

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
	const headerLink = {
		href: type === "login" ? "/signup" : "/login",
		text: type === "login" ? "Sign up" : "Log in",
	};

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
					asChild
				>
					<Link href={headerLink.href}>{headerLink.text}</Link>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
