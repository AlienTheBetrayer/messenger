import { Icons } from "@/features/ui/lib";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
	queryStateHooks,
} from "@/shared";

export const VerifyHeader = () => {
	const [, setVerify] = queryStateHooks.useVerify();

	return (
		<CardHeader className="pt-4 pb-2 px-6 border-b border-border/40 bg-muted/10 relative">
			<div className="flex flex-col gap-1.5">
				<CardTitle className="text-2xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
					Verification
				</CardTitle>
				<CardDescription className="text-xs text-muted-foreground/90 tracking-tight leading-relaxed max-w-[240px]">
					Enter the verification code that has been sent to your email address.
				</CardDescription>
			</div>

			<CardAction className="absolute top-8 right-6">
				<Button
					className="size-7 p-0 text-muted-foreground/60 hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
					variant="ghost"
					type="button"
					onClick={() => {
						setVerify(null);
					}}
				>
					<span className="*:size-3.5 flex items-center justify-center">
						{Icons.close}
					</span>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
