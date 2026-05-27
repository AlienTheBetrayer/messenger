import { ForgotEmailContent } from "@/features/auth/ui/forgot-email/ForgotEmailContent";
import { ForgotEmailHeader } from "@/features/auth/ui/forgot-email/ForgotEmailHeader";

export const ForgotEmail = () => {
	return (
		<div className="flex flex-col gap-5">
			<ForgotEmailHeader />
			<ForgotEmailContent />
		</div>
	);
};
