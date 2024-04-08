"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ShieldEllipsis } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialButtons } from "@/components/ui/social-buttons";
import { RegisterSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "david@gmail.com",
      password: "password",
      isNurse: false,
    },
  });
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Max"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Robinson"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label
                htmlFor="isNurse"
                className=" flex items-center space-x-4 rounded-md border p-4"
              >
                <ShieldEllipsis />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Are you a nurse?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check this if you are a nurse.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="isNurse"
                  render={({ field }) => {
                    return (
                      <FormControl>
                        <Switch
                          id="isNurse"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    );
                  }}
                />
              </Label>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <SocialButtons />
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
