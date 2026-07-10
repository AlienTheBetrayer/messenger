import { X } from "lucide-react";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";

export const VerifyHeader = () => {
	// states
	const fragment = useFragment();
	const { type } = useAuthFormProvider();

	// jsx
	return (
		<CardHeader>
			<CardTitle>Verification</CardTitle>
			<CardDescription>
				Enter the verification code that's been sent to your email.
			</CardDescription>
			<CardAction>
				<Button
					className="w-6! h-6! p-0!"
					variant="destructive"
					type="button"
					onClick={() => {
						fragment.set(type);
					}}
				>
					<X />
				</Button>
			</CardAction>
		</CardHeader>
	);
};
