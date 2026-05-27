import { Button, CardFooter } from "@/shared";

export const ForgotPasswordFooter = () => {
	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
        type="submit"
        form="forgot-password-form"
				className="w-full"
			>
				Send an email
			</Button>
		</CardFooter>
	);
};
