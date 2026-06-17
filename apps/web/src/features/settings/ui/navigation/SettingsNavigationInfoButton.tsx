"use client";

import { Button } from "@/shared";

export const SettingsNavigationInfoButton = ({
	image,
	title,
	description,
  color,
  className,
}: {
	image: React.ReactNode;
	title: string;
	description: string;
	color?: string;
    className?: string;
}) => {
	const values = {
		color: color ?? "var(--muted-foreground)",
	};

	return (
		<Button
      variant="ghost"
      className={`flex gap-2 w-full h-full ${className ?? ""}`}
		>
			<div
				className="flex items-center justify-center rounded-sm w-8 h-8 border"
				style={{
					borderColor: `color-mix(in srgb, ${values.color} 60%, var(--background))`,
					color: values.color,
					background: `color-mix(in srgb, ${values.color} 20%, var(--background))`,
				}}
			>
				{image}
			</div>

			<div className="flex flex-col grow text-left">
				<span className="text-foreground">{title}</span>
				<span className="text-muted-foreground text-8">{description}</span>
			</div>
		</Button>
	);
};
