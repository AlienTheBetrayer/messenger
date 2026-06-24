import {
	Box,
	CircleUser,
	Eye,
	EyeOff,
	KeyRound,
	LogOut,
	Moon,
	Settings,
	Trash2,
	Trash2Icon,
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
	theme: <Moon />,
	logout: <LogOut />,
	settings: <Settings />,
	trash: <Trash2 />,
	box: <Box />,
	trash: <Trash2Icon />,
} as const satisfies Record<string, React.ReactNode>;

/**
 * all icons union literal
 */
export type IconsLiteral = keyof typeof Icons;
