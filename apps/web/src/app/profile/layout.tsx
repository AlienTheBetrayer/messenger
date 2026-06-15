export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="flex justify-center mt-16">{children}</main>;
}
