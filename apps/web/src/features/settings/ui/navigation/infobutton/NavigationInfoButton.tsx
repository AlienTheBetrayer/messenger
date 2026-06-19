import { cn } from "@/features/ui";
import { Button } from "@/shared";

export const NavigationInfoButton = ({
	children,
  className,
  asChild
}: {
	children: React.ReactNode;
    className?: string;
  asChild?: boolean
}) => {
	return (
		<Button
			variant="ghost"
			className={cn(
				"flex items-center justify-start gap-3 w-full h-auto p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
				className,
			)}
			asChild={asChild ?? true}
		>
			{children}
		</Button>
	);
};
