import { Button, CardFooter } from "@/shared";

export const VerifyFormFooter = () => {
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
				type="submit"
				variant="secondary"
				className="w-full"
			>
				Verify
			</Button>
		</CardFooter>
	);
};
