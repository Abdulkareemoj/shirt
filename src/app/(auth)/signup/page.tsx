"use client";

import { useState } from "react";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
// import { registerUser } from "../auth-actions";
import { schemaRegister, type SignUpFormValues } from "~/lib/schemas";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);
    setServerError(null);

    // try {
    //   const result = await registerUser(values);

    //   if (!result.success) {
    //     setServerError(result.message);
    //     return;
    //   }

    //   // Redirect to dashboard on success
    //   router.push("/dashboard");
    // } catch (error) {
    //   setServerError("An unexpected error occurred. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  }

  // Handle OAuth sign in
  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {serverError && (
                <div className="text-sm font-medium text-destructive text-center">
                  {serverError}
                </div>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link
                href="/signin"
                className="text-sm text-muted-foreground hover:text-primary pt-5"
              >
                Already have an account? Sign In
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
