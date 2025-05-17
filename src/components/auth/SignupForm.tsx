"use client";

import { useActionState, useFormStatus } from "react"; // Changed from "react-dom"
import { signupWithEmail } from "@/app/auth/actions";
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/client";
import { doc, setDoc } from "firebase/firestore";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}

export function SignupForm() {
  const [state, formAction] = useActionState(signupWithEmail, initialState); // Changed from useFormState
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const displayName = formData.get("displayName") as string;

    if (!email || !password || !displayName) {
      toast({ variant: "destructive", title: "Error", description: "All fields are required." });
      return;
    }
    if (password.length < 6) {
      toast({ variant: "destructive", title: "Error", description: "Password must be at least 6 characters." });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
      
      toast({ title: "Success", description: "Account created successfully. Redirecting to dashboard..." });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup Error:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to create account." });
    }
  };

  useEffect(() => {
    // This effect can handle messages from server actions if they were fully implemented server-side for auth
    if (state?.message && !state.success) {
      toast({ variant: "destructive", title: "Error", description: state.message });
    }
    if (state?.message && state.success) { // Potentially from a server action
      toast({ title: "Success", description: state.message });
      // router.push("/dashboard"); // Redirection is handled in handleSubmit
    }
  }, [state, toast, router]);

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
        <CardDescription>Join Teleflow and supercharge your Telegram messaging.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* The form still uses formAction for potential server-side validation messages if needed,
            but actual signup is client-side via handleSubmit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" name="displayName" type="text" placeholder="Your Name" required />
            {state?.errors?.displayName && <p className="text-xs text-destructive">{state.errors.displayName[0]}</p>}
          </div>
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
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
