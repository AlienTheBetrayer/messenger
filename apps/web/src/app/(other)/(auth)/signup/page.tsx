import { AuthPage } from "@/app/(other)/(auth)/login/page";

export const metadata = {
	title: "Signing up",
};

export default function SignupPage() {
	return <AuthPage type="signup" />;
}
