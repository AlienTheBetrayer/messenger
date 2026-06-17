"use client";

import { useNavigationTree } from "@/features/settings/hooks/useNavigationTree";

export const SettingsNavigation = () => {
  const { jsx } = useNavigationTree();

	return (
		<nav className="flex flex-col">
      <ul className="flex flex-col gap-2">
        {jsx}
      </ul>
		</nav>
	);
};
