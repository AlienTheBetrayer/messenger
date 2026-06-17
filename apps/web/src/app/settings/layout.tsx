import { SettingsNavigation } from "@/features/settings/ui/navigation/SettingsNavigation";

export default function SettingsLayout({
	children,
	sections,
}: {
	children: React.ReactNode;
	sections: React.ReactNode;
}) {
	return (
		<main className="grid grid-cols-[1fr_3fr_1fr] w-screen max-width mx-auto">
			<SettingsNavigation />

			<section>{children}</section>
			<nav>{sections}</nav>
		</main>
	);
}
