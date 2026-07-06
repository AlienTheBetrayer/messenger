import { MiniProfileCube } from "@/features/connections/ui/other/MiniProfileCube";

export const ConnectedSessionCubeButton = ({
	userId,
	groupId,
}: {
	userId: string;
	groupId?: string;
}) => {
	return (
		<MiniProfileCube
			userId={userId}
			groupId={groupId}
			props={{
				variant: "secondary",
				size: "xl",
				className: "not-hover:bg-muted/50 justify-start absolute inset-0",
			}}
		/>
	);
};
