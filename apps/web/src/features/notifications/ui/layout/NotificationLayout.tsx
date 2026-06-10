export const NotificationLayout = ({
	text,
	action,
}: {
	text: React.ReactNode;
	action: React.ReactNode;
}) => {
	return (
		<div className="flex justify-between items-center w-full">
			<span>{text}</span>
			{action}
		</div>
	);
};
