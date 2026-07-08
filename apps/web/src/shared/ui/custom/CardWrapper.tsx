import { cn } from "@/features/ui";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";

export const CardWrapper = ({
	title,
	description,
	children,
	className,
}: {
	title: string;
	description: string;
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<Card className={cn("w-full bg-card/30", className ?? "")}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>

			<CardContent>{children}</CardContent>
		</Card>
	);
};
