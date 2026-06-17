"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { renderTree } from "@/features/settings/lib/parse";

export const useNavigationTree = () => {
	// setup
	const router = useRouter();

	const jsx = useMemo(() => {
		return renderTree({
			onSelect: (item) => {
				router.push(item.href);
			},
		});
	}, [router]);

	return useMemo(() => ({ jsx }), [jsx]);
};
