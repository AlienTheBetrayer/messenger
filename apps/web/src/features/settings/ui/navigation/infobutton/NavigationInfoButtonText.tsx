export const NavigationInfoButtonText = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="flex flex-col grow text-left truncate">
			<span className="text-foreground truncate">{title}</span>
			<span className="text-muted-foreground text-8 truncate">
				{description}
			</span>
		</div>
	);
};
