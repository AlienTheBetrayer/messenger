import {
  Button,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared";
import Link from "next/link";


export const ForgotEmailHeader = () => {
	// jsx
	return (
		<CardHeader>
			<CardTitle>Email recovery</CardTitle>
			<CardDescription>
				Attempts to retrieve the last used email address.
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
