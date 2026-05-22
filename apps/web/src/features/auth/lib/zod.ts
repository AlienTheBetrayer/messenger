import z from "zod";

/**
 * zod schema for auth form
 */
export const authFormSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(32, "Password must be at most 32 characters."),
});

/**
 * type for the auth form's data
 */
export type AuthFormData = z.infer<typeof authFormSchema>;
