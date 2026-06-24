"use client";

import { GroupFormSchema, groupFormSchema } from "@gravity/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const useGroupForms = () => {
	// forms
	const groupForm = useForm<GroupFormSchema>({
		resolver: zodResolver(groupFormSchema),
		defaultValues: {
			title: "",
			emoji: "",
		},
		shouldUnregister: true,
	});

	return useMemo(() => {
		return {
			groupForm,
		};
	}, [groupForm]);
};