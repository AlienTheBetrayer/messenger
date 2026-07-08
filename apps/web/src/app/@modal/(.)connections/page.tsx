import { Connections } from "@/features/connections/ui/Connections";
import { InterceptionDialog } from "@/shared/ui/custom/InterceptionDialog";

export default function ConnectionsModal() {
	return (
		<InterceptionDialog
			title="Connections"
      description="View and modify your authenticated sessions."
      className="max-w-xl!"
		>
			<Connections groupClassName="max-h-100"/>
		</InterceptionDialog>
	);
}
