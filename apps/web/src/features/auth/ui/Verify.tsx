"use client";

import { useAuthLogic } from "@/features/auth/hooks/useAuthLogic";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyContent } from "@/features/auth/ui/verify/VerifyContent";
import { VerifyFooter } from "@/features/auth/ui/verify/VerifyFooter";
import { VerifyHeader } from "@/features/auth/ui/verify/VerifyHeader";

export const Verify = () => {
  const { verifyForm } = useAuthFormProvider();
  const { verify } = useAuthLogic();

  return (
    <form
      noValidate
      id="auth-form"
      onSubmit={verifyForm.handleSubmit(verify)}
      className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-top-4 duration-300 ease-out"
    >
      <VerifyHeader />
      <div className="flex flex-col gap-5 px-6">
        <VerifyContent />
      </div>
      <VerifyFooter />
    </form>
  );
};