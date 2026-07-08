export default function ConnectionsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex justify-center mx-auto mt-24">
			{children}
		</main>
	);
}
