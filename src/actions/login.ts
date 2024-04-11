"use server";

import { db } from "@/lib/prisma-client";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/schemas/login.schema";
import { signIn } from "@/auth";
import { z } from "zod";
import { AuthError } from "next-auth";

interface ErrorOutput {
  error: { type: string; message: string };
}

interface SuccessOutput {
  res: { type: string; message: string };
}
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
): Promise<ErrorOutput | SuccessOutput> => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: "403", message: "Invalid fields" } };
  }

  const { email, password } = validateFields.data;
  const existingUser = await db.user.findUnique({ where: { email } });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: { type: "403", message: "Invalid Credentials" } };
  }

  try {
    // TODO: implement passinf redirecting URL from client
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    // await signIn("passkey")
    return { res: { type: "200", message: "Success" } };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: { type: "403", message: "Invalid credentials" } };
        default:
          return { error: { type: "500", message: "Something went wrong!" } };
      }
    }
    throw error;
  }
};
