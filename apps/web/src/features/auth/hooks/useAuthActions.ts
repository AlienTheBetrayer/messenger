import {
	AuthFormSchema,
	generateId,
	VerificationFormSchema,
} from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useAuthNotifications } from "@/features/auth/hooks/useAuthNotifications";
import {
	useForgotPasswordMutation,
	useGetCodeMutation,
	useLoginConnectionMutation,
	useLoginMutation,
	useSignupMutation,
} from "@/features/auth/model/auth.api";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import { normalizeError, queryStateHooks, useAppSelector } from "@/shared";
import {
	AuthLoginReturn__,
	usersType__,
} from "@/shared/model/serializable.types";

export const useAuthActions = () => {
	// redux
	const [getCode] = useGetCodeMutation();
	const [login] = useLoginMutation();
	const [loginConnection] = useLoginConnectionMutation();
	const [signup] = useSignupMutation();
	const [forgotPassword] = useForgotPasswordMutation();

	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// states
	const { authForm, verifyForm, type } = useAuthFormProvider();
	const [, setVerify] = queryStateHooks.useVerify();
	const notifications = useAuthNotifications();

	// auth
	const auth = useCallback(
		async (data: AuthFormSchema) => {
			setVerify("pending");

			const fn = async () => {
				try {
					const res = await getCode({
						email: data.email,
						type,
						action: awaitingGroup ? "connect" : "login",
					}).unwrap();
					return res;
				} catch (e) {
					const message = normalizeError(e);
					authForm.setError("email", { message });
					throw new Error(message);
				}
			};

			notifications.auth(fn);
		},
		[authForm, getCode, notifications, setVerify, type, awaitingGroup],
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
					let user: usersType__ | null = null;

					switch (type) {
						case "login": {
							let ret: AuthLoginReturn__ | null = null;

							if (awaitingGroup) {
								ret = await loginConnection({
									email: values.email,
									password: values.password,
									code: data.code,
									groupId: awaitingGroup.id,
									connectionId: generateId(),
								}).unwrap();
							} else {
								ret = await login({
									email: values.email,
									password: values.password,
									code: data.code,
								}).unwrap();
							}

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

					setVerify("success");
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
			loginConnection,
			notifications,
			setVerify,
			signup,
			type,
			verifyForm,
			awaitingGroup,
		],
	);

	return useMemo(() => {
		return {
			auth,
			verify,
		};
	}, [auth, verify]);
};
