// "use server";

// import type { z } from "zod";
// import bcrypt from "bcryptjs";
// // import { signIn, signOut } from "~/server/auth";
// import { db } from "~/server/db";
// import {
//   schemaLogin,
//   schemaRegister,
//   schemaForgotPassword,
// } from "~/lib/schemas";
// import type { Role } from "@prisma/client";

// // Type for auth response
// type AuthResponse = {
//   success: boolean;
//   message: string;
// };

// // Register a new user
// export async function registerUser(
//   values: z.infer<typeof schemaRegister>,
//   role: Role = "USER"
// ): Promise<AuthResponse> {
//   try {
//     // Validate the input
//     const validatedFields = schemaRegister.safeParse(values);

//     if (!validatedFields.success) {
//       return {
//         success: false,
//         message: "Invalid input. Please check your details.",
//       };
//     }

//     const { username, email, password } = validatedFields.data;

//     // Check if user already exists
//     const existingUser = await db.user.findFirst({
//       where: {
//         OR: [{ email }, { name: username }],
//       },
//     });

//     if (existingUser) {
//       return {
//         success: false,
//         message: "User with this email or username already exists.",
//       };
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user with the specified role
//     await db.user.create({
//       data: {
//         name: username,
//         email,
//         password: hashedPassword,
//         role,
//       },
//     });

//     // Sign in the user after registration
//     await signIn("credentials", {
//       identifier: email,
//       password,
//       redirect: false,
//     });

//     return {
//       success: true,
//       message: "Registration successful!",
//     };
//   } catch (error) {
//     console.error("Registration error:", error);
//     return {
//       success: false,
//       message: "An error occurred during registration. Please try again.",
//     };
//   }
// }

// // Login a user
// export async function loginUser(
//   values: z.infer<typeof schemaLogin>
// ): Promise<AuthResponse> {
//   try {
//     // Validate the input
//     const validatedFields = schemaLogin.safeParse(values);

//     if (!validatedFields.success) {
//       return {
//         success: false,
//         message: "Invalid input. Please check your details.",
//       };
//     }

//     const { identifier, password } = validatedFields.data;

//     // Attempt to sign in
//     const result = await signIn("credentials", {
//       identifier,
//       password,
//       redirect: false,
//     });

//     if (!result?.ok) {
//       return {
//         success: false,
//         message: "Invalid credentials. Please try again.",
//       };
//     }

//     return {
//       success: true,
//       message: "Login successful!",
//     };
//   } catch (error) {
//     console.error("Login error:", error);
//     return {
//       success: false,
//       message: "An error occurred during login. Please try again.",
//     };
//   }
// }

// // Forgot password
// export async function forgotPassword(
//   values: z.infer<typeof schemaForgotPassword>
// ): Promise<AuthResponse> {
//   try {
//     // Validate the input
//     const validatedFields = schemaForgotPassword.safeParse(values);

//     if (!validatedFields.success) {
//       return {
//         success: false,
//         message: "Invalid email. Please check your details.",
//       };
//     }

//     const { email } = validatedFields.data;

//     // Check if user exists
//     const user = await db.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       // For security reasons, don't reveal if the email exists or not
//       return {
//         success: true,
//         message:
//           "If an account with this email exists, a password reset link has been sent.",
//       };
//     }

//     // In a real application, you would:
//     // 1. Generate a password reset token
//     // 2. Store it in the database with an expiration
//     // 3. Send an email with a link to reset the password

//     // For this example, we'll just return a success message
//     return {
//       success: true,
//       message:
//         "If an account with this email exists, a password reset link has been sent.",
//     };
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     return {
//       success: false,
//       message: "An error occurred. Please try again.",
//     };
//   }
// }

// // Logout a user
// export async function logoutUser(): Promise<void> {
//   await signOut({ redirectTo: "/" });
// }

// // Create admin user (for initial setup)
// export async function createAdminUser(
//   values: z.infer<typeof schemaRegister>
// ): Promise<AuthResponse> {
//   return registerUser(values, "ADMIN");
// }

// // Update user role
// export async function updateUserRole(
//   userId: string,
//   role: Role
// ): Promise<AuthResponse> {
//   try {
//     await db.user.update({
//       where: { id: userId },
//       data: { role },
//     });

//     return {
//       success: true,
//       message: `User role updated to ${role} successfully.`,
//     };
//   } catch (error) {
//     console.error("Update user role error:", error);
//     return {
//       success: false,
//       message: "An error occurred while updating the user role.",
//     };
//   }
// }
