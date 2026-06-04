"use client";

import "@/shared/styles/globals.css";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { ThemesProvider } from "@/features/ui/providers/ThemesProvider";
import { baseApi } from "@/shared";

import { Header } from "../features/ui/ui/header/Header";

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
			suppressHydrationWarning
			lang="en"
			className={`${inter.variable} antialiased`}
		>
			<body className="min-h-[200vh] flex flex-col">
				<ThemesProvider>
					<Suspense fallback={null}>
						<ApiProvider api={baseApi}>
							<Header />

							{children}
						</ApiProvider>
					</Suspense>
				</ThemesProvider>
			</body>
		</html>
	);
}
