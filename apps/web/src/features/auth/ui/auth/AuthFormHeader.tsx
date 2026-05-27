import Link from "next/link";

import {
	type AuthFormVariantsType,
	AuthFormVariants,
} from "@/features/auth/lib/variants";
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	Button,
	useQueryState,
} from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFormHeader = ({ type }: Props) => {
	// jsx variants
	const variant = AuthFormVariants[type];

	//// TODO: DELETE
	// states
	const [step, setStep] = useQueryState("step");

	// jsx
	return (
		<CardHeader>
			<CardTitle>{variant.title}</CardTitle>
			<CardDescription>{variant.description}</CardDescription>
			<CardAction>
				<Button
					type="button"
					onClick={() => setStep(step === "verify" ? null : "verify")}
				>
					Step
				</Button>
				<Button
					variant="link"
					asChild
				>
					<Link href={variant.href}>{variant.linkText}</Link>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
