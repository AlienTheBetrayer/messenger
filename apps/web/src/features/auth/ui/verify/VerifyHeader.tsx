import { X } from "lucide-react";

import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
	queryStateHooks,
} from "@/shared";

export const VerifyHeader = () => {
	// states
	const [, setVerify] = queryStateHooks.useVerify();

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
					variant="ghost"
					type="button"
					onClick={() => {
						setVerify(null);
					}}
				>
					<X />
				</Button>
			</CardAction>
		</CardHeader>
	);
};
