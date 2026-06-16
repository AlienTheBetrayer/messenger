import {
	CircleUser,
	Eye,
	EyeOff,
	KeyRound,
	LogOut,
	Moon,
	Settings,
	Trash2,
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
  trash: <Trash2/>,
} as const satisfies Record<string, React.ReactNode>;
