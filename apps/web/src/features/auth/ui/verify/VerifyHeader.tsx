import { X } from "lucide-react";

import { VerifyFormVariants } from "@/features/auth/lib/variants";
import {
  Button,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  useQueryStateHooks,
} from "@/shared";

export const VerifyHeader = () => {
	// states
	const [, setVerify] = useQueryStateHooks.verify();

	// ui states
	const variant = VerifyFormVariants;

	// jsx
	return (
		<CardHeader>
			<CardTitle>{variant.title}</CardTitle>
			<CardDescription>{variant.description}</CardDescription>
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
