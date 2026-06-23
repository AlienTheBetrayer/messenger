import type React from "react";

export const metadata = {
	title: "Authentication",
};

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="flex justify-center mt-16">{children}</main>;
}
