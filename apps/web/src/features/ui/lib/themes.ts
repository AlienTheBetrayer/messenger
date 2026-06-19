/**
 * all available themes (categorized)
 */
export const AvailableThemesList = [
	{
		value: "Light Spectrum",
		items: ["light"],
	},
	{
		value: "Dark Cores",
		items: ["dark", "dark-warm", "dark-cold", "amoled"],
	},
	{
		value: "System",
		items: ["high-contrast", "system"],
	},
] as const;

export const AvailableThemes = AvailableThemesList.flatMap(
	({ items }) => items,
);
export const AvailableThemesGroups = AvailableThemesList.map(
	({ value }) => value,
);

/**
 * all available themes (literal)
 */
export type AvailableTheme = (typeof AvailableThemes)[number];

/**
 * all available groups
 */
export type AvailableGroup = (typeof AvailableThemesGroups)[number];
