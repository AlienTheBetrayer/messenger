"use client";

import { GroupFormSchema, groupFormSchema } from "@gravity/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { randomGroupFormEmoji } from "@/features/connections/lib/emojis";

export const useGroupForms = () => {
	// forms
	const groupForm = useForm<GroupFormSchema>({
		resolver: zodResolver(groupFormSchema),
		defaultValues: {
			title: "",
			emoji: randomGroupFormEmoji(),
		},
		shouldUnregister: true,
	});

	return useMemo(() => {
		return {
			groupForm,
		};
	}, [groupForm]);
};
