"use client";

import {
	GroupFormSchema,
	groupFormSchema,
	randomElement,
} from "@gravity/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { GROUP_EMOJIS } from "@/features/sessions/lib/emojis";

export const useGroupForms = () => {
	// forms
	const groupForm = useForm<GroupFormSchema>({
		resolver: zodResolver(groupFormSchema),
		defaultValues: {
			title: "",
			emoji: randomElement(GROUP_EMOJIS),
		},
		shouldUnregister: true,
	});

	return useMemo(() => {
		return {
			groupForm,
		};
	}, [groupForm]);
};
