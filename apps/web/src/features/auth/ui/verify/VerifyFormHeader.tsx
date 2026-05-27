import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
	useQueryState,
} from "@/shared";
import { X } from "lucide-react";

export const VerifyFormHeader = () => {
	// states
	const [, setStep] = useQueryState("step");

	// jsx
	return (
		<CardHeader>
			<CardTitle>Verify</CardTitle>
			<CardDescription>Enter the code sent to your email</CardDescription>
			<CardAction>
				<Button
					className="w-6! h-6! p-0!"
					variant="ghost"
					type="button"
					onClick={() => {
						setStep(null);
					}}
				>
					<X />
				</Button>
			</CardAction>
		</CardHeader>
	);
};
