export default function ConnectionsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-center h-fit w-full">
			{children}
		</div>
	);
}
