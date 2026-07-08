import { AppLeftbar } from "@/features/ui/ui/leftbar/AppLeftbar";
import { AppRightbar } from "@/features/ui/ui/rightbar/AppRightbar";

export default function CoreLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="grid h-full transition-all duration-300 grid-cols-[minmax(250px,auto)_1fr_minmax(250px,auto)] relative gap-2">
			<AppLeftbar className="static! h-full w-full" />
			<div className="flex justify-center items-center">{children}</div>
			<AppRightbar className="static! h-full w-full" />
		</main>
	);
}
