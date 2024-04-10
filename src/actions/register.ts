"use server";

import db from "@/lib/prisma-client";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { RegisterSchema } from "@/schemas/register.schema";
import { signIn } from "@/auth";
import { z } from "zod";

// TODO: check how to redirect and authorize from here
interface ErrorOutput {
  error: { type: string; message: string };
}

interface SuccessOutput {
  res: { type: string; message: string };
}

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  callbackUrl?: string | null,
): Promise<ErrorOutput | SuccessOutput> => {
  console.log("🔄️  start Register action..");
  // await db.$connect().then(() => console.log("Connected to DB"));
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: { type: "403", message: "Invalid fields" } };
  }
  const { email, password, firstName, lastName } = validatedFields.data;
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: { type: "400", message: "Email already in use" } };
  }
  //TODO: hash password!
  console.log("🔄️ before creting user");
  const newUser = await db.user.create({
    data: {
      email,
      password,
      name: `${firstName} ${lastName}`,
    },
  });
  console.log("🔄️ after creting user", DEFAULT_LOGIN_REDIRECT);
  await signIn("credentials", {
    email: newUser.email,
    password: values.password,
    redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  });
  return { res: { type: "200", message: "Success" } };
};
