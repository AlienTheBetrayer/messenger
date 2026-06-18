import Image from "next/image";

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
			className={`flex shrink-0 items-center justify-center rounded-sm w-8 h-8 border ${className ?? ""}`}
			style={{
				borderColor: `color-mix(in srgb, ${values.color} 60%, var(--background))`,
				color: values.color,
				background: `color-mix(in srgb, ${values.color} 20%, var(--background))`,
			}}
		>
			<div
				style={
					animation
						? {
								animation: `bounce 1.25s ease-in-out infinite`,
							}
						: undefined
				}
			>
				{typeof image === "string" ? (
					<Image
						src={image}
						width={14}
						height={14}
						alt="pfp"
					/>
				) : (
					image
				)}
			</div>
		</div>
	);
};
