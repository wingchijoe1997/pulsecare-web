import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/prisma-client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log(
    //     "🎵🎵❌ insider redirect callback...",
    //     url,
    //     " and vase URL: ",
    //     baseUrl,
    //   );
    //   // Allows relative callback URLs
    //   // if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // // Allows callback URLs on the same origin
    //   // else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl;
    // },
    async signIn({ user, account }) {
      console.log("signin auth callback...");
      if (account?.provider !== "credentials") return true;
      return true;
    },
    async session({ session, token, user }) {
      // await connectToDB();

      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }

      // if (token.role && session.user) {
      //   session.user.role = token.role
      // }
      // // Send properties to the client, like an access_token and user id from a provider.

      return session;
    },
    // README: we decided to use JWT as strategy, hence we need to define it
    async jwt({ token, account, profile }) {
      // await connectToDB();
      // if (!token.sub) return token;
      // const existingUser = await User.findById(token.sub)
      // if (!existingUser) return token;

      // token.role = existingUser.role

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
