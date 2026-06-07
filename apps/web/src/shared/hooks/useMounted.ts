"use client";

import { useEffect, useState } from "react";

export const useMounted = () => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		requestAnimationFrame(() => {
			setMounted(true);
		});
	}, []);

	return mounted;
};
