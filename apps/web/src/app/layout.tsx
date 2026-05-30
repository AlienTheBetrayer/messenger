"use client";

import "@/shared/styles/globals.css";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Inter } from "next/font/google";

import { baseApi } from "@/shared";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} antialiased`}
		>
			<body className="min-h-screen flex flex-col">
				<ApiProvider api={baseApi}>{children}</ApiProvider>
			</body>
		</html>
	);
}
