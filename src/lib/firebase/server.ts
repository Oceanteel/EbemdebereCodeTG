// src/lib/firebase/server.ts
// This file would be for Firebase Admin SDK initialization if more complex backend operations
// were needed that bypass client-side security rules (e.g., admin tasks, complex queries).
// For this project, direct Firestore writes from client-actions protected by security rules,
// and client-SDK for auth, are the primary approach.
// Genkit flows would use their own Firebase initialization if interacting with Firebase services directly.

// import * as admin from 'firebase-admin';

// if (!admin.apps.length) {
//   admin.initializeApp({
//     // credential: admin.credential.applicationDefault(), // If using GCP environment
//     // databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
//   });
// }

// export const serverAuth = admin.auth();
// export const serverDb = admin.firestore();

// For simplicity, we rely on client SDK and server actions with client context or genkit flows.
// This file is a placeholder to acknowledge server-side Firebase aspects.

// Dummy export to make the file valid
export const placeholder = null;
// We'll use the client-side db for Firestore interactions in server actions where appropriate,
// assuming security rules are set up. For more complex auth-related server actions (like custom token minting),
// Firebase Admin SDK would be essential here.

// Re-export client SDK for use in server actions where client auth context is not directly available but rules allow operations
// This is generally not recommended; server actions should ideally operate with admin privileges or clearly defined service account roles.
// For now, let's assume that client-side SDK handles all auth and Firestore interactions are rule-protected.
import { db, auth } from './client'; // This is unusual but can work for simple cases in server actions IF rules allow unauthenticated access or use user.uid
export { db, auth };
