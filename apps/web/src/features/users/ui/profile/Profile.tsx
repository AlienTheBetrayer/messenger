"use client";

import { skipToken } from "@reduxjs/toolkit/query";

import { useGetUserQuery } from "@/features/users/model/users.api";
import { selectUserByUsername } from "@/features/users/model/users.selectors";
import { InfoCube } from "@/features/users/ui/profile/dialog/InfoCube";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const Profile = ({ username }: { username: string | null }) => {
	// redux
	const foundUser = useAppSelector(
		(state) => username && selectUserByUsername(state, username),
	);

	// data loading in case no data
	const data = useGetUserQuery(
		username && !foundUser ? { username } : skipToken,
	);

	if (data.isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Loading...</CardTitle>
					<CardDescription>User will be loaded in no time</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-0.5">
					{Array.from({ length: 6 }, (_, k) => (
						<div
							className="skeleton w-full h-8"
							key={k}
						/>
					))}
				</CardContent>
				<CardFooter />
			</Card>
		);
	}

	const user = foundUser || data.data?.user;

	if (!user) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>User was not found.</CardTitle>
					<CardDescription>Are you sure the URL is correct?</CardDescription>
				</CardHeader>

				<CardContent />
				<CardFooter />
			</Card>
		);
	}

	// jsx
	return (
		<Card>
			<CardContent>
				<InfoCube
					animation="animate-bounce"
					className="w-32 h-32"
					image={user.image_url}
					color={user.color}
				/>
			</CardContent>

			<CardFooter />
		</Card>
	);
};
