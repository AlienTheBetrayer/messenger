import Link from "next/link";

import { AuthFormVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
  Button,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared";

export const AuthHeader = () => {
	// states
	const { type } = useAuthFormProvider();

	// ui states
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardHeader className="pt-8 pb-4 px-6 border-b border-border/40 bg-muted/10">
			<div className="flex flex-col gap-1.5">
        <CardTitle className="text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent pb-1">

					{variant.title}
				</CardTitle>
				<CardDescription className="text-sm tracking-tight text-muted-foreground max-w-sm">
					{variant.description}
				</CardDescription>
			</div>

			<CardAction className="absolute top-8 right-6">
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="h-7 text-xs px-2 text-primary font-medium hover:bg-primary/5 transition-colors"
				>
					<Link href={type === "login" ? "/signup" : "/login"}>
						{type === "login" ? "Sign up" : "Log in"}
					</Link>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
