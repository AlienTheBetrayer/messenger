"use client";

import { Button } from "@/shared";

export const SettingsNavigationInfoButton = ({
	image,
	title,
	description,
	color,
}: {
	image: React.ReactNode;
	title: string;
	description: string;
	color?: string;
  }) => {
  const values = {
    color: color ?? "var(--muted-foreground)",
  }

	return (
		<Button variant="ghost" className="flex gap-2 py-7 w-full">
			<div
				className="flex items-center justify-center rounded-sm p-2 outline-1"
				style={{
          outlineColor: values.color,
          color: values.color,
          background: `color-mix(in srgb, ${values.color} 20%, var(--background))`
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
