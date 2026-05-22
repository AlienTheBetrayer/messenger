import { AuthFormData, authFormSchema } from "@/features/auth/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const useAuthForm = () => {
    // validated form
    const form = useForm<AuthFormData>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // return
    return useMemo(() => {
        return form;
    }, [form]);
};
