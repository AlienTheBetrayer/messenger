import { Verify } from "@/features/auth/ui/Verify";
import { Card, useQueryStateHooks } from "@/shared";

export const VerifyOrchestrator = () => {
	// states
	const [verify] = useQueryStateHooks.verify();

	// jsx
	return (
		<div
			className="grid w-full transition-all duration-300"
			style={
				verify
					? {
							gridTemplateRows: "1fr",
							scale: 1,
							opacity: 1,
							translate: `0px 0px`,
						}
					: {
							gridTemplateRows: "0fr",
							scale: 0.8,
							opacity: 0,
							translate: `0px -100px`,
						}
			}
		>
			<Card className="min-h-0! shadowed">
				<Verify />
			</Card>
		</div>
	);
};
