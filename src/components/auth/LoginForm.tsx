"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginWithEmail } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { SocialLogins } from "./SocialLogins";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginWithEmail, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast({ variant: "destructive", title: "Error", description: "Email and password are required." });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Success", description: "Signed in successfully." });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to sign in." });
    }
  };


  useEffect(() => {
    if (state?.message && !state.success) {
      toast({ variant: "destructive", title: "Error", description: state.message });
    }
    if (state?.message && state.success) {
      // This branch might be less relevant now that handleSubmit is client-side for actual auth
      // but server action could still return messages for other purposes.
      toast({ title: "Success", description: state.message });
      // router.push("/dashboard"); // Redirection is handled in handleSubmit
    }
  }, [state, toast, router]);

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
        <CardDescription>Sign in to access your Teleflow account.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* The form still uses formAction for potential server-side validation messages if needed,
            but actual login is client-side via handleSubmit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            {state?.errors?.email && <p className="text-xs text-destructive">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state?.errors?.password && <p className="text-xs text-destructive">{state.errors.password[0]}</p>}
          </div>
          <SubmitButton />
        </form>
        <Separator className="my-6" />
        <SocialLogins />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
