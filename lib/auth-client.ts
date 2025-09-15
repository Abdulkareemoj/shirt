import {
  adminClient,
  oneTapClient,
  emailOTPClient,
  usernameClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient(),
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      promptOptions: {
        maxAttempts: 1,
      },
    }),
    emailOTPClient(),
    usernameClient(),
  ],
});

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  getSession,
  forgetPassword,
  resetPassword,
  isUsernameAvailable,
  sendVerificationEmail,
  requestPasswordReset,
} = authClient;
