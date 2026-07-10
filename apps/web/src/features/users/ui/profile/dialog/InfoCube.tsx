import Image from "next/image";

import { cn } from "@/features/ui";

export const InfoCube = ({
	image,
	color,
	className,
	animation,
}: {
	image: string | React.ReactNode;
	color?: string;
	className?: string;
	animation?: string;
}) => {
	// defaults
	const values = {
		color: color ?? "var(--muted-foreground)",
		animation: animation ?? "bounce",
	};

	// jsx
	return (
		<div
			className={cn(
				"flex shrink-0 items-center justify-center rounded-sm w-8 h-8 aspect-square border",
				className,
			)}
			style={{
				borderColor: `color-mix(in srgb, ${values.color} 60%, var(--background))`,
				color: values.color,
				background: `color-mix(in srgb, ${values.color} 20%, var(--background))`,
			}}
		>
			<div className={cn("w-1/2 aspect-square", animation)}>
				{typeof image === "string" ? (
					<Image
						src={image}
						width={16}
						height={16}
						alt="pfp"
						className="w-full h-full"
					/>
				) : (
					image
				)}
			</div>
		</div>
	);
};
