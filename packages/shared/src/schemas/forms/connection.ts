import z from "zod";

import { verificationFormSchema } from "./verify.js";

export const connectionVerifyFormSchema = z.object({
	code: verificationFormSchema.shape.code,
});

export type ConnectionVerifyFormSchema = z.infer<
	typeof connectionVerifyFormSchema
>;
