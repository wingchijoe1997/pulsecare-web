import Google, { GoogleProfile } from "@auth/core/providers/google";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas/login.schema";
import db from "@/lib/prisma-client";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("=========AUTHORIZE==========");
        // // // TODO: use graphql to authenticate
        // console.log(req)

        // // // Validate fields
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;
        if (validatedFields) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;

          if (password === user.password) return user;
        }

        return null;
      },
    }),
    Google({
      // https://authjs.dev/reference/core/errors/#oauthaccountnotlinked
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
