import { AuthPage } from "@/app/(other)/(auth)/login/page";

export const metadata = {
	title: "Forgot password?",
};

export default function ForgotPasswordPage() {
	return <AuthPage type="forgot_password" />;
}
