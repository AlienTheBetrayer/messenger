import { RecursiveKeys } from "@/shared/types/utils";


/**
 * type for the navigation tree
 */
export type SettingsNavigationItem = {
	text: string;
  href: string;
  highlighted?: boolean;
	children?: Record<string, SettingsNavigationItem>;
};

/**
 * tree that generates the settings navigation on /settings
 */
export const SettingsNavigationTree = {
	profile: {
		text: "Profile",
		href: "/settings/profile",
    children: {
      title: {
        text: "Title",
        href: "/settings/profile/title",
      },
      
    }
	},
	account: {
		text: "Account",
		href: "/settings/account",
	},
	appearance: {
		text: "Appearance",
		href: "/settings/appearance",
	},
	privacy: {
		text: "Privacy",
		href: "/settings/privacy",
	},
	security: {
		text: "Security",
		href: "/settings/security",
	},
} as const satisfies Record<string, SettingsNavigationItem>;

/**
 * all keys
 */
export type SettingsNavigationTreeKeys = RecursiveKeys<
	typeof SettingsNavigationTree
>;
