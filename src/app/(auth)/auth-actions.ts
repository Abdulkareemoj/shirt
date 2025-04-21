// import { z } from "zod";
// import { setAuthToken, removeAuthToken } from "./get-token";
// import {
//   registerUserService,
//   loginUserService,
//   forgotPasswordService,
// } from "./auth-service";
// import { schemaRegister, schemaLogin } from "~/lib/schemas";

// // Register user action - compatible with React Hook Form
// export const registerUser = async (
//   data: z.infer<typeof schemaRegister>,
//   navigate: (path: string) => void
// ) => {
//   try {
//     const response = await registerUserService(data);

//     if (response && response.jwt) {
//       // Store token in both cookies and localStorage
//       setAuthToken(response.jwt);
//       localStorage.setItem("user", JSON.stringify(response.user));
//       navigate("/dashboard");
//       return { success: true };
//     }

//     return {
//       success: false,
//       message: "Registration failed. Please try again.",
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message:
//         error.response?.data?.error?.message || "An unexpected error occurred",
//       errors: error.response?.data?.error?.details || {},
//     };
//   }
// };

// // Login user action - compatible with React Hook Form
// export const loginUser = async (
//   data: z.infer<typeof schemaLogin>,
//   navigate: (path: string) => void
// ) => {
//   try {
//     const response = await loginUserService(data);

//     if (response && response.jwt) {
//       // Store token in both cookies and localStorage
//       setAuthToken(response.jwt);
//       localStorage.setItem("user", JSON.stringify(response.user));
//       navigate("/dashboard");
//       return { success: true };
//     }

//     return {
//       success: false,
//       message: "Login failed. Please check your credentials.",
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.response?.data?.error?.message || "Invalid credentials",
//       errors: error.response?.data?.error?.details || {},
//     };
//   }
// };

// // Logout action
// export const logoutUser = (navigate?: (path: string) => void) => {
//   removeAuthToken();
//   if (navigate) {
//     navigate("/auth/signin");
//   }
// };

// // Forgot password action - compatible with React Hook Form
// export const forgotPassword = async (data: { email: string }) => {
//   try {
//     await forgotPasswordService(data.email);
//     return {
//       success: true,
//       message:
//         "If your email exists in our system, you will receive a password reset link.",
//     };
//   } catch (error: any) {
//     // For security reasons, we don't want to reveal if the email exists or not
//     return {
//       success: true, // Still return success even on error
//       message:
//         "If your email exists in our system, you will receive a password reset link.",
//     };
//   }
// };
