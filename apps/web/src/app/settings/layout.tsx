import { SettingsNavigation } from "@/features/settings";

export const metadata = {
	title: "Settings",
};

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="grid grid-cols-[1fr_3.5fr] gap-4 w-screen max-width mx-auto mt-16">
			<SettingsNavigation />
			<section>{children}</section>
		</main>
	);
}
