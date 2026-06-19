"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardFooter,
	queryStateHooks,
	Separator,
	Spinner,
} from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
	// states
	const { type } = useAuthFormProvider();
	const isLoading = useIsLoading(["getCode"]);
	const [verify] = queryStateHooks.useVerify();

	// jsx
	return (
		<CardFooter className="flex flex-col gap-5 px-6 pt-0 pb-8 mt-1 border-t border-border/40 bg-muted/10">
			<div className="w-full pt-6">
				<Button
					disabled={!!verify || isLoading}
					type="submit"
					size="lg"
					className="w-full h-11 text-sm font-semibold shadow-md shadow-primary/10 gap-2 focus-visible:ring-primary/40 group"
					form="auth-form"
				>
					{isLoading ? (
						<Spinner className="size-4 text-primary-foreground/70" />
					) : (
						<span>Continue</span>
					)}
				</Button>
			</div>

			<div className="w-full flex flex-col gap-4">
				<div className="relative flex items-center">
					<Separator className="grow opacity-60 bg-border/50" />
					<span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-mono font-medium tracking-tight uppercase px-2 py-0.5 rounded border border-border/50 bg-background text-muted-foreground">
						Identity Services
					</span>
					<Separator className="grow opacity-60 bg-border/50" />
				</div>

				<ul className="grid grid-cols-2 gap-3">
					<li className="flex">
						<Button
							type="button"
							variant="outline"
							className="w-full h-9 gap-2.5 text-xs px-3 font-medium bg-background border-border/50 hover:bg-muted/40 transition-colors group"
							asChild
						>
							<Link href="http://localhost:3001/oauth/google">
								<div className="size-4 shrink-0 flex items-center justify-center filter grayscale-[40%] group-hover:grayscale-0 transition-all">
									<Image
										alt="Google"
										src="/google.svg"
										width={14}
										height={14}
										priority
									/>
								</div>
								Google Account
							</Link>
						</Button>
					</li>
					<li className="flex">
						<Button
							type="button"
							variant="outline"
							className="w-full h-9 gap-2.5 text-xs px-3 font-medium bg-background border-border/50 hover:bg-muted/40 transition-colors group"
							asChild
						>
							<Link href="http://localhost:3001/oauth/github">
								<div className="size-4 shrink-0 flex items-center justify-center filter grayscale-[40%] group-hover:grayscale-0 transition-all">
									<Image
										alt="Github"
										src="/github.svg"
										width={16}
										height={16}
										priority
									/>
								</div>
								Github Account
							</Link>
						</Button>
					</li>
				</ul>
			</div>
		</CardFooter>
	);
};
