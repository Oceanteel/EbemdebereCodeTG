import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login - Teleflow",
  description: "Sign in to your Teleflow account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-blue-200 p-4">
      <div className="mb-8 flex items-center space-x-3">
         <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.06L9.06 11.9z"></path><path d="M7.01 18.92c-1.32.95-2.99 1.07-4.24.32-1.29-.78-1.9-2.32-1.62-3.8.24-1.29.96-2.46 2.04-3.25"></path><path d="m14.94 11.9-8.06 8.06a2.85 2.85 0 1 1-4.03-4.03l8.06-8.06L14.94 11.9z"></path></svg>
        <h1 className="text-5xl font-bold text-primary">Teleflow</h1>
      </div>
      <LoginForm />
    </div>
  );
}
