import { useAuthForm } from "@/features/auth/hooks/useAuthForm";
import { AuthFormData } from "@/features/auth/lib/zod";
import { FormProvider } from "react-hook-form";

type Props = {
    children: React.ReactNode;
    onSubmit: (data: AuthFormData) => void;
};

export const AuthFormProvider = ({ children, onSubmit }: Props) => {
    // form
    const form = useAuthForm();

    // jsx
    return (
        <FormProvider {...form}>
            <form
                id="auth-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                {children}
            </form>
        </FormProvider>
    );
};
