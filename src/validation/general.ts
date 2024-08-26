import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    login_email: z.string().min(1).max(15),
    login_password: z.string().min(1).max(15),
  }),
});
export type SignInSchema = z.infer<typeof loginSchema>["body"];

export const registrationSchema = z.object({
  body: z.object({
    user_email: z.string().min(1).max(15),
    user_password: z.string().min(1).max(15),
  }),
});
export type ValidateSigninOtpSchema = z.infer<typeof registrationSchema>["body"];


export const validateOtpSchema = z.object({
  body: z.object({
    auth_email: z.string().email(), // Assuming it should be a valid email
    otp: z.string().min(1).max(6),  // Assuming OTP length is between 1 and 6 characters
  }),
});

// Infer the TypeScript type from the schema
export type ValidateOtpSchema = z.infer<typeof validateOtpSchema>["body"];
