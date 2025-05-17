"use client";

import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react"; // Using Chrome as a generic browser/Google icon
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider, db } from "@/lib/firebase/client";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SocialLogins() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      // Check if user document exists, if not, create one
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }
      
      toast({ title: "Success", description: "Signed in with Google successfully." });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to sign in with Google." });
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
        <Chrome className="mr-2 h-5 w-5" />
        Sign in with Google
      </Button>
    </div>
  );
}
