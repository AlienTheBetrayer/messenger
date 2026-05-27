import {
	AuthFormVariants,
	AuthFormVariantsType,
} from "@/features/auth/lib/variants";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
	useQueryState,
} from "@/shared";
import { X } from "lucide-react";

type Props = {
	type: AuthFormVariantsType;
};

export const VerifyFormHeader = ({ type }: Props) => {
	// states
	const [, setStep] = useQueryState("step");

	// ui states
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardHeader>
			<CardTitle>Verify {variant.title}</CardTitle>
			<CardDescription>Enter the code sent to your email.</CardDescription>
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
