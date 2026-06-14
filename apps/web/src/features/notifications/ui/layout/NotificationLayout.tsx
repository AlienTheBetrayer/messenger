import { Separator } from "@/shared";

export const NotificationLayout = ({
	text,
	action,
}: {
	text: React.ReactNode;
	action?: React.ReactNode;
}) => {
	return (
		<div className="flex items-center w-full">
			<span>{text}</span>
			{action && (
				<>
					<Separator
						className="ml-auto!"
						orientation="vertical"
					/>
					{action}
				</>
			)}
		</div>
	);
};
