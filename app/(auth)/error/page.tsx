"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { AlertCircle } from "lucide-react";

import type { Metadata } from "next";
import { useSearchParams } from "next/navigation";

const metadata: Metadata = {
  title: "Error - Onashirt",
  description:
    " There was an error during the authentication process. Please try again or contact support.",
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam) {
      switch (errorParam) {
        case "Configuration":
          setError("There is a problem with the server configuration.");
          break;
        case "AccessDenied":
          setError("You do not have access to this resource.");
          break;
        case "Verification":
          setError(
            "The verification link may have expired or already been used."
          );
          break;
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
        case "EmailCreateAccount":
        case "Callback":
        case "OAuthAccountNotLinked":
          setError("There was a problem with your authentication provider.");
          break;
        case "EmailSignin":
          setError("The email could not be sent.");
          break;
        case "CredentialsSignin":
          setError("The credentials you provided were invalid.");
          break;
        case "SessionRequired":
          setError("You must be signed in to access this page.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Authentication Error
          </CardTitle>
          <CardDescription className="text-center">
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="text-destructive font-medium">{error}</p>
            <p className="text-muted-foreground mt-2">
              Please try again or contact support if the problem persists.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/signin">Back to Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
