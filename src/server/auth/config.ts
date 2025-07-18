// import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// import { db } from "~/server/db";
import type { Role } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: "/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/dashboard",
  },
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //       role: user.role,
  //     },
  //   }),
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.role = user.role;
  //     }
  //     return token;
  //   },
  // },
  // adapter: PrismaAdapter(db),
  // providers: [
  //   CredentialsProvider({
  //     name: "Credentials",
  //     credentials: {
  //       identifier: { label: "Email or Username", type: "text" },
  //       password: { label: "Password", type: "password" },
  //     },
  //     async authorize(credentials) {
  //       if (!credentials?.identifier || !credentials?.password) {
  //         return null;
  //       }

  //       // Check if the user exists with either email or username
  //       const user = await db.user.findFirst({
  //         where: {
  //           OR: [
  //             { email: credentials.identifier },
  //             { name: credentials.identifier },
  //           ],
  //         },
  //       });

  //       if (!user || !user.password) {
  //         return null;
  //       }

  //       // Verify password
  //       const isPasswordValid = await bcrypt.compare(
  //         credentials.password,
  //         user.password
  //       );

  //       if (!isPasswordValid) {
  //         return null;
  //       }

  //       return {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         image: user.image,
  //         role: user.role,
  //       };
  //     },
  //   }),
  //   DiscordProvider({
  //     clientId: process.env.DISCORD_CLIENT_ID || "",
  //     clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
  //   }),
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID || "",
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  //   }),

  //   /**
  //    * ...add more providers here.
  //    *
  //    * Most other providers require a bit more work than the Discord provider. For example, the
  //    * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
  //    * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
  //    *
  //    * @see https://next-auth.js.org/providers/github
  //    */
  // ],
};
//  satisfies NextAuthConfig;
