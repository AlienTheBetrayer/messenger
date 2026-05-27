import Image from "next/image";

import {
	type AuthFormVariantsType,
	AuthFormVariants,
} from "@/features/auth/lib/variants";
import { Button, CardFooter, useQueryState } from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFooter = ({ type }: Props) => {
	// states
	const [verify] = useQueryState("verify");

	// ui states
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
				type="submit"
				className="w-full"
				form="auth-form"
				disabled={!!verify}
			>
				{variant.title}
			</Button>

			<Button
				type="button"
				variant="secondary"
				className="w-full"
				disabled={!!verify}
			>
				<Image
					alt=""
					src="/google.svg"
					width={14}
					height={14}
				/>
				{variant.title} with Google
			</Button>
		</CardFooter>
	);
};
