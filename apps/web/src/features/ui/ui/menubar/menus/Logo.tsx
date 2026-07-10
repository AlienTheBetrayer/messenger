"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";

import { Button } from "@/shared/ui";

gsap.registerPlugin(useGSAP);

export const Logo = () => {
	// refs
	const imageContainerRef = useRef<HTMLDivElement | null>(null);

	// animations
	const handleAnimation = useCallback(() => {
		if (
			!imageContainerRef.current ||
			gsap.isTweening(imageContainerRef.current)
		) {
			return;
		}

		gsap.to(imageContainerRef.current, {
			y: -1.1,
			duration: 0.18,
			ease: "power2.out",
			yoyo: true,
			repeat: 1,
		});
	}, []);

	// jsx
	return (
		<div className="h-full">
			<Button
				asChild
				className="h-full aspect-square"
        size="icon-sm"
				variant="ghost"
			>
				<Link
					href="/home"
					onPointerEnter={handleAnimation}
					onFocus={handleAnimation}
				>
					<div ref={imageContainerRef}>
						<Boxes />
					</div>
				</Link>
			</Button>
		</div>
	);
};
