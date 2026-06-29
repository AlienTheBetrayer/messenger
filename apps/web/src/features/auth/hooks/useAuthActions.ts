import { AuthFormSchema, AuthSchema, generateId, VerificationFormSchema } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useAuthNotifications } from "@/features/auth/hooks/useAuthNotifications";
import {
	useForgotPasswordMutation,
	useGetCodeMutation,
	useLoginMutation,
	useSignupMutation,
} from "@/features/auth/model/auth.api";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { selectAwaitingConnectionGroup, selectConnectSessionsAwaitingGroupId } from "@/features/ui/model/ui.selectors";
import { normalizeError, queryStateHooks, useAppSelector } from "@/shared";
import { usersType__ } from "@/shared/model/serializable.types";

export const useAuthActions = () => {
	// redux
	const [getCode] = useGetCodeMutation();
	const [login] = useLoginMutation();
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
          
          const connectData = {
            action: awaitingGroup ? "connect" : "login",
            actionMetadata: awaitingGroup ? {
              groupId: awaitingGroup.id,
              connectionId: generateId()
            } : undefined
          } satisfies ({ action: AuthSchema["action"], actionMetadata?: AuthSchema["actionMetadata"] });

					switch (type) {
						case "login": {
							const ret = await login({
								email: values.email,
								password: values.password,
								code: data.code,
								...connectData
							}).unwrap();

							user = ret.user;
							break;
						}
						case "signup": {
							const ret = await signup({
								email: values.email,
								password: values.password,
								code: data.code,
								...connectData
							}).unwrap();

							user = ret.user;
							break;
						}

						case "forgot_password": {
							const ret = await forgotPassword({
								email: values.email,
								password: values.password,
								code: data.code,
								...connectData
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
