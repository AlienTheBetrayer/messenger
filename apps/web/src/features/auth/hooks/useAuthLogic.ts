import {
	AuthFormSchema,
	usersType,
	VerificationFormSchema,
} from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useAuthNotifications } from "@/features/auth/hooks/useAuthNotifications";
import {
	useForgotPasswordMutation,
	useGetCodeMutation,
	useLoginMutation,
	useSignupMutation,
} from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { normalizeError, queryStateHooks } from "@/shared";

export const useAuthLogic = () => {
	// states
	const { authForm, verifyForm, type } = useAuthFormProvider();
	const [, setAuthType] = queryStateHooks.useAuthType();
	const notifications = useAuthNotifications();

	// redux
	const [getCode] = useGetCodeMutation();
	const [login] = useLoginMutation();
	const [signup] = useSignupMutation();
	const [forgotPassword] = useForgotPasswordMutation();

	// auth
	const auth = useCallback(
		async (data: AuthFormSchema) => {
			const fn = async () => {
				try {
					const res = await getCode({ email: data.email, type }).unwrap();
					setAuthType("verify-pending");
					return res;
				} catch (e) {
					const message = normalizeError(e);
					authForm.setError("email", { message });
					throw new Error(message);
				}
			};

			notifications.auth(fn);
		},
		[authForm, getCode, notifications, setAuthType, type],
	);

	// verify
	const verify = useCallback(
		async (data: VerificationFormSchema) => {
			// triggering the auth form + validation
			if (!(await authForm.trigger())) {
				return;
			}

			// getting values
			const values = authForm.getValues();

			// api requests
			const fn = async () => {
				try {
					let user: usersType | null = null;

					switch (type) {
						case "login": {
							const ret = await login({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();

							user = ret.user;
							break;
						}
						case "signup": {
							const ret = await signup({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();

							user = ret.user;
							break;
						}

						case "forgot_password": {
							const ret = await forgotPassword({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();

							user = ret.user;
							break;
						}
					}

					setAuthType("verify-success");
					return user;
				} catch (e) {
					// error handling
					const message = normalizeError(e);
					verifyForm.setError("code", { message });
					throw new Error(message);
				}
			};

			// notifications
			notifications.verify(fn);
		},
		[
			authForm,
			forgotPassword,
			login,
			notifications,
			setAuthType,
			signup,
			type,
			verifyForm,
		],
	);

	return useMemo(() => {
		return {
			auth,
			verify,
		};
	}, [auth, verify]);
};
