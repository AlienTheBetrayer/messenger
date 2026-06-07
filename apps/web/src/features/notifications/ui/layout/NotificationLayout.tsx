type Props = {
	text: React.ReactNode;
	action: React.ReactNode;
};

export const NotificationLayout = ({ text, action }: Props) => {
	return (
		<div className="flex justify-between items-center w-full">
			<span>{text}</span>
			{action}
		</div>
	);
};
