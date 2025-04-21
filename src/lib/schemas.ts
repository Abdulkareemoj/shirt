import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  identifier: z.string().min(1, {
    message: "Email or username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Define schemas for validation
export const schemaRegister = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be between 3 and 20 characters",
    })
    .max(20, {
      message: "Username must be between 3 and 20 characters",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be between 6 and 100 characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(100, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export const schemaForgotPassword = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
