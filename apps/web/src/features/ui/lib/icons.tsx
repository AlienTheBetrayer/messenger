import {
	CircleUser,
	Eclipse,
	Eye,
	EyeOff,
	KeyRound,
	LogOut,
	Settings,
	X,
} from "lucide-react";

/**
 * all icons used in the app
 */
export const Icons = {
	profile: <CircleUser />,
	key: <KeyRound />,
	eyeShown: <Eye />,
	eyeHidden: <EyeOff />,
	close: <X />,
	theme: <Eclipse />,
	logout: <LogOut />,
	settings: <Settings />,
} as const satisfies Record<string, React.ReactNode>;
