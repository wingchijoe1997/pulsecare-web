"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/../public/login.jpeg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas/login.schema";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialButtons } from "@/components/ui/social-buttons";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/login";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "david@gmail.com",
      password: "password",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data && "error" in data) {
            form.setError("root.serverError", {
              ...data.error,
            });
          }
          // toast.success("Login Successful", {
          //   description: "You are now logged in"
          // })
        })
        .catch(() => {
          form.setError("root.serverError", {
            type: "500",
            message: "Server error. Please try again later.",
          });
        });
    });
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center py-12"
        >
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="email"
                        placeholder="*@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input disabled={isPending} type="password" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                    This is your password.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    Error {form.formState.errors.root.serverError.type}
                  </AlertTitle>
                  <AlertDescription>
                    {form.formState.errors.root.serverError.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
              <SocialButtons />
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </Form>
      <div className="hidden bg-muted lg:block">
        <Image
          src={loginImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
