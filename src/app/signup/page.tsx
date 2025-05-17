
import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign Up - Teleflow",
  description: "Create your Teleflow account.",
};

// New Teleflow Logo SVG (inspired by Taskboard logo)
const TeleflowLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="none">
    <rect width="20" height="20" x="2" y="2" rx="4" ry="4" fill="hsl(var(--primary))"/>
    <path d="m8 12 3 3 5-5" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-[hsl(var(--background)_/_0.5)] p-4"> {/* Updated gradient */}
      <div className="mb-8 flex items-center space-x-3">
        <TeleflowLogo />
        <h1 className="text-5xl font-bold text-primary">Teleflow</h1>
      </div>
      <SignupForm />
    </div>
  );
}
