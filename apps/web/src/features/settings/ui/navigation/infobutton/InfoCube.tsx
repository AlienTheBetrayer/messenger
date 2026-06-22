import Image from "next/image";

import { cn } from "@/features/ui";

export const InfoCube = ({
	image,
	color,
	className,
	bouncing,
}: {
	image: string | React.ReactNode;
	color?: string;
	className?: string;
	bouncing?: boolean;
}) => {
	const resolvedColor = color ?? "var(--muted-foreground)";

	return (
		<div
			className={cn(
				"grid shrink-0 rounded-md w-9 h-9 border shadow-sm overflow-hidden transition-colors duration-200",
				className,
			)}
			style={{
				borderColor: `color-mix(in srgb, ${resolvedColor} 40%, var(--border))`,
				color: resolvedColor,
				background: `color-mix(in srgb, ${resolvedColor} 12%, var(--background))`,
			}}
		>
			<div
				className={cn(
					"flex items-center justify-center",
					bouncing && "animate-sub-bounce",
				)}
			>
				{typeof image === "string" ? (
					<Image
						src={image}
						width={16}
						height={16}
						alt="pfp"
						className="object-cover rounded-sm"
					/>
				) : (
					image
				)}
			</div>
		</div>
	);
};
