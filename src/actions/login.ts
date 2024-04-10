"use server";

import { db } from "@/lib/prisma-client";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/schemas/login.schema";
import { signIn } from "@/auth";
import { z } from "zod";
import { AuthError } from "next-auth";

// FIXME: this works dev environment, but not in production because mongoose can't run on edge.
// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   console.log("🔄️  Logging in");
//   const validateFields = LoginSchema.safeParse(values);
//   if (!validateFields.success) {
//     return { error: { type: '403', message: 'Invalid fields' } }
//   }

//   const { email, password } = validateFields.data;

//   try {
//     // Credentials can be checked on the edge, but we can't use mongoose on the edge!!!
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo:DEFAULT_LOGIN_REDIRECT,
//     })
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: { type: '403', message: 'Invalid credentials' } }
//         default:
//           return { error: { type: '500', message: 'Something went wrong!' } }
//       }
//     }

//   }
// };
interface ErrorOutput {
  error: { type: string; message: string };
}

interface SuccessOutput {
  res: { type: string; message: string };
}
export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<ErrorOutput | SuccessOutput> => {
  // await db.$connect().then(() => console.log("Connected to DB"));
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: "403", message: "Invalid fields" } };
  }

  const { email, password } = validateFields.data;
  const existingUser = await db.user.findUnique({ where: { email } });

  if (!existingUser) {
    return { error: { type: "403", message: "Invalid Credentials" } };
  }
  // TODO: hash password
  const passwordMatch: boolean = existingUser.password === password;
  if (!passwordMatch) {
    return { error: { type: "403", message: "Invalid Credentials" } };
  }
  console.log(DEFAULT_LOGIN_REDIRECT);

  try {
    // TODO: implement passinf redirecting URL from client
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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

  // await signIn("credentials", { user: JSON.stringify(existingUser), redirectTo: DEFAULT_LOGIN_REDIRECT }).catch(
  //   (error) => {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           return { error: { type: '403', message: 'Invalid credentials' } }
  //         default:
  //           return { error: { type: '500', message: 'Something went wrong, try again later.' } }
  //       }
  //     }

  //     return { error: { type: '500', message: 'Something went wrong, try again later.' } }

  //   }
  // )
};
