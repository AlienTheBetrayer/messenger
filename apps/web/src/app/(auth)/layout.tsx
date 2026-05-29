"use client";

import axios from "axios";
import type React from "react";
import { useCallback, useState } from "react";

import { AuthFormProvider } from "@/features";
import { Button, transformError } from "@/shared";

type Props = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
	const [data, setData] = useState<string>("");

	const getData = useCallback(async () => {
		try {
			const data = await axios.get("/api/auth/me");
			setData(JSON.stringify(data.data));
		} catch (e) {
			const message = transformError(e);
			setData(message);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await axios.delete("/api/auth/logout");
		} catch (e) {
			const message = transformError(e);
			setData(message);
		}
	}, []);

	return (
		<AuthFormProvider>
			<div className="flex items-center justify-center h-screen">
				{children}

				<div className="flex flex-col gap-2">
					<Button
						onClick={() => {
							void getData();
						}}
					>
						Fetch
					</Button>

					<Button
						variant="destructive"
						onClick={() => {
							void logout();
						}}
					>
						Log out
					</Button>

					<span className="max-w-32">{data}</span>
				</div>
			</div>
		</AuthFormProvider>
	);
}
