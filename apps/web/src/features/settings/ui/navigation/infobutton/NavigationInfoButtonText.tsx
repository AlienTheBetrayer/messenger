export const NavigationInfoButtonText = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="flex flex-col self-stretch text-left truncate min-w-0 justify-evenly">
			<span className="text-sm text-foreground tracking-tight leading-none">
				{title}
			</span>

			<span className="text-xs text-muted-foreground/80 font-normal leading-none">
				{description}
			</span>
		</div>
	);
};
