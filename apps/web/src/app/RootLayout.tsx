"use client";

import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/react";

import { ThemesProvider } from "@/features/ui/providers/ThemesProvider";
import { Header } from "@/features/ui/ui/header/Header";
import { Watcher } from "@/shared";
import { ReduxProvider } from "@/shared/model/ReduxProvider";

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<ReduxProvider>
			<Watcher />
			<ThemesProvider>
				<NuqsAdapter>
					<Header />

					{children}
				</NuqsAdapter>
			</ThemesProvider>
		</ReduxProvider>
	);
};
