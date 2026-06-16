export const NotificationLayout = ({
	text,
	action,
}: {
	text: React.ReactNode;
	action?: React.ReactNode;
}) => {
	return (
		<div className="flex items-center justify-between w-full">
			<span>{text}</span>
			{action && action}
		</div>
	);
};
