import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared";
import Link from "next/link";

export const ForgotPasswordHeader = () => {
	return (
		<CardHeader>
			<CardTitle>Password recovery</CardTitle>
			<CardDescription>
				Enter the email address associated with your account.
			</CardDescription>
			<CardAction>
				<Button
					variant="link"
					type="button"
					asChild
				>
					<Link href="/login">Log in</Link>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
