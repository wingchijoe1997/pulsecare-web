import Google, { GoogleProfile } from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { AuthConfig } from "@auth/core";
import { LoginSchema } from "@/schemas/login.schema";
import db from "@/lib/prisma-client";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
            // return {
            //  ...user,
            //  // Don't pass password to the client
            //  password: undefined,
            // };
          }
        }

        return null;
      },
    }),
    Google({
      profile: async (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          email: profile.email,
          role: profile.role ?? "patient",
        };
      },
      // https://authjs.dev/reference/core/errors/#oauthaccountnotlinked
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies AuthConfig;
