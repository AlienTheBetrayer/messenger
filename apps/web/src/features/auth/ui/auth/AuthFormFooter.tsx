import Image from "next/image";

import {
	type AuthFormVariantsType,
	AuthFormVariants,
} from "@/features/auth/lib/variants";
import { Button, CardFooter, useQueryState } from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFormFooter = ({ type }: Props) => {
	// states
	const [step] = useQueryState("step");

	// ui states
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
				type="submit"
				className="w-full"
				form="auth-form"
				disabled={step === "verify"}
			>
				{variant.buttonText}
			</Button>

			<Button
				type="button"
				variant="secondary"
				className="w-full"
				disabled={step === "verify"}
			>
				<Image
					alt=""
					src="/google.svg"
					width={14}
					height={14}
				/>
				{variant.buttonText} with Google
			</Button>
		</CardFooter>
	);
};
