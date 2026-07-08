"use client";

import { useEffect, useRef, useState } from "react";

/**
 * makes stuff draggable without breaking radix/shadcn centered dialogs
 * @param ref - the element you actually want to move
 * @returns grabbing state and the onPointerDown handler for the trigger
 */
export const useDraggable = (ref: React.RefObject<HTMLElement | null>) => {
	const [grabbing, setGrabbing] = useState<boolean>(false);

	const startMousePos = useRef<[number, number]>([0, 0]);
	const startElementPos = useRef<[number, number]>([0, 0]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Escape") setGrabbing(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (!grabbing || !ref.current) return;

		const handleMove = (e: PointerEvent) => {
			if (!ref.current) return;

			const deltaX = e.clientX - startMousePos.current[0];
			const deltaY = e.clientY - startMousePos.current[1];

			const newX = startElementPos.current[0] + deltaX;
			const newY = startElementPos.current[1] + deltaY;

			ref.current.style.transform = `translate3d(${newX}px, ${newY}px, 0px)`;
		};

		const handleUp = () => {
			setGrabbing(false);
		};

		window.addEventListener("pointermove", handleMove);
		window.addEventListener("pointerup", handleUp);

		return () => {
			window.removeEventListener("pointermove", handleMove);
			window.removeEventListener("pointerup", handleUp);
		};
	}, [grabbing, ref]);

	const onPointerDown = (e: React.PointerEvent) => {
		if (e.button !== 0 || !ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		startElementPos.current = [rect.left, rect.top];
		startMousePos.current = [e.clientX, e.clientY];

		ref.current.classList.remove(
			"-translate-x-1/2",
			"-translate-y-1/2",
			"top-1/2",
			"left-1/2",
			"duration-100",
			"data-open:animate-in",
			"data-open:zoom-in-95",
		);

		ref.current.style.top = "0px";
		ref.current.style.left = "0px";
		ref.current.style.transition = "none";
		ref.current.style.animation = "none";

		ref.current.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0px)`;

		setGrabbing(true);
		e.preventDefault();
	};

	return { grabbing, onPointerDown };
};
