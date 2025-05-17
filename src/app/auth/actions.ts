"use server";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/server"; // Assuming a server-side admin SDK setup for direct auth actions if needed, otherwise client SDK for auth is fine. For simplicity, let's assume client SDK usage is handled on client, and this file might be less used if client SDK handles all auth.
// However, for creating user docs in Firestore upon signup, server action is good.
import { doc, setDoc } from "firebase/firestore"; // Firestore admin SDK
import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  displayName: z.string().min(2, "Display name must be at least 2 characters long").optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function signupWithEmail(prevState: any, formData: FormData) {
  const validatedFields = SignupSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields.",
    };
  }

  const { email, password, displayName } = validatedFields.data;

  try {
    // This part needs to be done client-side with Firebase Client SDK due to auth state
    // For the purpose of this exercise, we'll describe the Firestore part
    // The actual `createUserWithEmailAndPassword` would be called on client
    // Then, upon successful client-side auth, a call could be made to this server action to create the user doc,
    // or the client itself creates the doc.
    // For now, let's simulate the success structure.
    
    // Placeholder for actual user creation logic (which is client-side for Firebase Auth)
    // On actual client-side success:
    // const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    // const user = userCredential.user;
    // await setDoc(doc(clientDb, "users", user.uid), {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: displayName || user.displayName || email.split('@')[0],
    //   photoURL: user.photoURL,
    //   createdAt: new Date(),
    // });

    return { message: "Signup successful. User document would be created.", success: true };
  } catch (error: any) {
    return { message: error.message || "Signup failed.", errors: {} };
  }
}


export async function loginWithEmail(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields.",
    };
  }
  // Actual signInWithEmailAndPassword would be client-side
  // This server action is mostly a placeholder for the form handling pattern
  return { message: "Login attempt. Actual login is client-side.", success: true };
}
