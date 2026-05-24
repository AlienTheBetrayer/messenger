import { Inter } from 'next/font/google';

import type { Metadata } from 'next';
import '@/shared/styles/globals.css';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Gravity',
	description: 'Gravity',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${inter.variable} antialiased`}>
			<body className='min-h-screen flex flex-col'>{children}</body>
		</html>
	);
}
