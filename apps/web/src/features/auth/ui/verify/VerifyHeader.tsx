import {
  Button,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  useQueryState,
} from "@/shared";
import { X } from "lucide-react";

export const VerifyHeader = () => {
	// states
	const [, setVerify] = useQueryState("verify");

	// jsx
	return (
		<CardHeader>
			<CardTitle>Verification</CardTitle>
			<CardDescription>Enter the code sent to your email.</CardDescription>
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
