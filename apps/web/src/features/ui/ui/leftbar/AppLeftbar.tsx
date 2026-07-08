import { cn } from "@/features/ui/lib";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared";

export const AppLeftbar = ({ className }: { className?: string }) => {
	return (
		<Card className={cn("shadowed", className ?? "")}>
			<CardHeader>
				<CardTitle>hi</CardTitle>
			</CardHeader>

			<CardContent className="grow" />

			<CardFooter />
		</Card>
	);
};
