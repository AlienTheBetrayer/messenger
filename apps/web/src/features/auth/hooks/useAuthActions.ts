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
	useLoginMutation,
	useSignupMutation,
} from "@/features/auth/model/auth.api";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { useAddConnectionMutation } from "@/features/connections/model/connections.api";
import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import { normalizeError } from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";
import { useAppSelector } from "@/shared/model/redux.hooks";
import { usersType__ } from "@/shared/model/serializable.types";

export const useAuthActions = () => {
	// redux
	const [getCode] = useGetCodeMutation();
	const [login] = useLoginMutation();
	const [signup] = useSignupMutation();
	const [forgotPassword] = useForgotPasswordMutation();
	const [addConnection] = useAddConnectionMutation();

	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// states
	const { authForm, verifyForm, type } = useAuthFormProvider();
	const fragment = useFragment();
  const notifications = useAuthNotifications();

	// auth
	const auth = useCallback(
		async (data: AuthFormSchema) => {
			fragment.set(`${type}/verify`);

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
		[authForm, getCode, notifications, fragment, type, awaitingGroup],
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
					let ret: {
						user: usersType__;
						[key: string]: unknown;
					} | null;

					switch (type) {
						case "login": {
							if (awaitingGroup) {
								ret = await addConnection({
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

							break;
						}
						case "signup": {
							ret = await signup({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();
							break;
						}

						case "forgot_password": {
							ret = await forgotPassword({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();
							break;
						}
					}

					fragment.set(`${type}/success`);
					return ret.user;
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
			addConnection,
			notifications,
			fragment,
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
