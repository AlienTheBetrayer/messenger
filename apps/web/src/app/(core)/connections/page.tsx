import { Connections } from "@/features/connections/ui/Connections";
import { CardWrapper } from "@/shared/ui/custom/CardWrapper";

export default function ConnectionsPage() {
	return (
		<CardWrapper
			title="Connections"
			description="Main hub for your authentication. Log out, create groups, relogin, and more."
		>
			<Connections groupClassName="max-h-100" />
		</CardWrapper>
	);
}
