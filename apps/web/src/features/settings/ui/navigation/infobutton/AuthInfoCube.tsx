"use client";

import Image from "next/image";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { InfoCube } from "@/features/settings/ui/navigation/infobutton/InfoCube";

export const AuthInfoCube = ({ className }: { className?: string }) => {
	// auth
	const { data: auth } = useAuth();

	// jsx
	return (
		<div className={`w-8 h-8 ${className ?? ""}`}>
			{auth ? (
				<InfoCube
					className="w-full h-full"
					image={
						<Image
							alt="pfp"
							width={14}
							height={14}
							src={auth.user.image_url}
						/>
					}
					color={auth.user.color}
				/>
			) : (
				<div className="skeleton w-full h-full" />
			)}
		</div>
	);
};
