"use client";

import { redirect } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProfilePage() {
	// redux
	const auth = useAuth();

  // redirecting
	if (!auth) {
		redirect("/login");
	} else {
		redirect(`/profile/${auth.user.username}`);
  }
}
