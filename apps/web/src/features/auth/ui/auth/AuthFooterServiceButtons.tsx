"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { selectVisibility } from "@/features/ui";
import { Button, Separator, useAppSelector } from "@/shared";

export const AuthFooterServiceButtons = () => {
	// redux
	const isSessionPopupVisible = useAppSelector((state) =>
		selectVisibility(state, "visibility"),
	);

	// states
	const urlExtension = isSessionPopupVisible ? "?type=connect" : "";
	const { type } = useAuthFormProvider();

	// forgot password has no service buttons
	if (type === "forgot_password") {
		return null;
	}

	// jsx
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="relative flex items-center">
				<Separator className="grow opacity-80 bg-border/50" />
				<span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-mono font-medium tracking-tight uppercase px-2 py-0.5 rounded border border-border/50 bg-background text-muted-foreground">
					Identity Services
				</span>
			</div>

			<ul className="grid grid-cols-2 gap-3">
				<li className="flex">
					<Button
						type="button"
						variant="outline"
						className="w-full h-9 gap-2.5 text-xs px-3 font-medium bg-background border-border/50 hover:bg-muted/40 transition-colors group"
						asChild
					>
						<Link href={`http://localhost:3001/oauth/google${urlExtension}`}>
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
						<Link href={`http://localhost:3001/oauth/github${urlExtension}`}>
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
	);
};
