import { SettingsNavigation } from "@/features/settings/ui/navigation/SettingsNavigation";

export default function SettingsLayout({
	children,
	sections,
}: {
	children: React.ReactNode;
	sections: React.ReactNode;
}) {
	return (
		<main className="grid grid-cols-[1fr_3.5fr] gap-4 w-screen max-width mx-auto mt-16">
			<SettingsNavigation />
			<section>{children}</section>
		</main>
	);
}
