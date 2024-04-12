import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/prisma-client";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {} & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    // newUser: '/profile/onboarding'
  },
  trustHost: true,
  callbacks: {
    async signIn({ account }) {
      // console.log("signin auth callback...");

      if (account?.provider !== "credentials") return true;
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return url;
    // },
    // README: we decided to use JWT as strategy, hence we need to define it
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
