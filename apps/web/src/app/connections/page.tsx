import { Connections } from "@/features/connections/ui/Connections";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared";

export default function ConnectionsPage() {
	return (
		<Card className="w-screen max-w-2xl">
			<CardHeader>
				<CardTitle>Connections</CardTitle>
				<CardDescription>
					Main hub for your authentication. Log out, create groups, relogin, and
					more.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Connections groupClassName="max-h-100" />
      </CardContent>
      
      <CardFooter/>
		</Card>
	);
}
