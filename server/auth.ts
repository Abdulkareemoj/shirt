import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins/admin";
import { emailOTP, oneTap, username } from "better-auth/plugins";
import { db, schema } from "~/server/db";

// const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";
// const to = process.env.TEST_EMAIL || "";
export const auth = betterAuth({
  appName: "ShirtApp",
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [
    admin(),
    username({
      minUsernameLength: 5,
      maxUsernameLength: 25,
      usernameValidator: (username) => /^[a-z0-9_-]+$/.test(username),
      usernameNormalization: (username) => {
        return username
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9_-]/g, "");
      },
    }),
    oneTap(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // For now, we'll just log the OTP to console
        // In production, you would send this via email service like Resend, SendGrid, etc.
        console.log(`[${type.toUpperCase()}] OTP for ${email}: ${otp}`);

        // Example with Resend (uncomment when you have email service configured):
        // await resend.emails.send({
        //   from: "noreply@yourdomain.com",
        //   to: email,
        //   subject: type === "sign-in" ? "Sign In OTP" : type === "email-verification" ? "Email Verification OTP" : "Password Reset OTP",
        //   html: `<p>Your OTP is: <strong>${otp}</strong></p><p>This code will expire in 5 minutes.</p>`,
        // });
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      allowedAttempts: 3,

      overrideDefaultEmailVerification: true,
    }),
  ],
  emailAndPassword: {
    enabled: true,
    // async sendResetPassword({ user, url }) {
    //   await resend.emails.send({
    //     from,
    //     to: user.email,
    //     subject: "Reset your password",
    //     react: reactResetPasswordEmail({
    //       username: user.email,
    //       resetLink: url,
    //     }),
    //   });
    // },
    //   emailVerification: {
    //     async sendVerificationEmail({ user, url }) {
    //       const res = await resend.emails.send({
    //         from,
    //         to: to || user.email,
    //         subject: "Verify your email address",
    //         html: `<a href="${url}">Verify your email address</a>`,
    //       });
    //       console.log(res, user.email);
    //     },
    //   },
    // onPasswordReset: async ({ user }, request) => {
    // your logic here
    // console.log(`Password for user ${user.email} has been reset.`);
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "discord", "demo-app"],
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    },
  },
  emailVerification: {
    // async
    sendVerificationEmail: async ({ user, url, token }) => {
      // const res = await resend.emails.send({
      //         from,
      //         to: to || user.email,
      //         subject: "Verify your email address",
      //         html: `<a href="${url}">Verify your email address</a>`,
      //       });
      //       console.log(res, user.email);
      //     },
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
});
