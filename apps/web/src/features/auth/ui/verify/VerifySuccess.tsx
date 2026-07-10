import { useCallback, useEffect, useRef, useState } from "react";

import { VerifySuccessVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";

export const VerifySuccess = () => {
	// variant
	const { type } = useAuthFormProvider();
	const variant = VerifySuccessVariants[type];
	const fragment = useFragment();

	const redirectFn = useCallback(() => {
		fragment.set("login");
	}, [fragment]);

	// jsx
	return (
		<div className="flex flex-col gap-5">
			<CardHeader>
				<CardTitle>{variant.title}</CardTitle>
				<CardDescription>{variant.description}</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-2">
				<Button onClick={redirectFn}>
					Log in.
					<VerifySuccessTimer
						onRedirect={() => {
							setTimeout(() => {
								redirectFn();
							}, 500);
						}}
					/>
				</Button>
			</CardContent>
		</div>
	);
};

export const VerifySuccessTimer = ({
	onRedirect,
}: {
	onRedirect: () => void;
}) => {
	// states
	const [remaining, setRemaining] = useState<number>(5);
	const redirected = useRef<boolean>(false);

	// interval
	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining((prev) => (prev > 0 ? prev - 1 : prev));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	// redirect
	useEffect(() => {
		if (remaining <= 0 && !redirected.current) {
			redirected.current = true;
			onRedirect();
		}
	}, [remaining, onRedirect]);

	// jsx
	return <span>Redirecting in {remaining}...</span>;
};
