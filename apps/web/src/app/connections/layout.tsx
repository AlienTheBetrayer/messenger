export default function ConnectionsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex justify-center mx-auto mt-24 w-screen max-w-3xl h-100">
			{children}
		</main>
	);
}
