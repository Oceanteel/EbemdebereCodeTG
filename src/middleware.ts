import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'firebaseIdToken'; // Example, actual check might be more complex or handled by client-side redirects

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Firebase auth cookie or rely on client-side checks + AuthProvider
  // For server-side protection, a more robust check involving token verification would be needed.
  // This is a simplified example assuming client-side auth handles the primary redirection.
  // With Next.js App Router and Server Components, true server-side protection needs careful setup.

  const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME) || request.cookies.has('__session'); // Check for common Firebase auth cookies

  // Public paths
  const publicPaths = ['/login', '/signup', '/api/auth']; // Add other public paths like API routes for auth

  // If trying to access a protected route and not authenticated, redirect to login
  if (!publicPaths.some(path => pathname.startsWith(path)) && !isAuthenticated && pathname !== '/') {
    // Temporarily allow / to proceed to client-side check
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access login/signup, redirect to dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If root path is accessed, let client-side logic decide
  if (pathname === '/') {
     // Client side will handle redirect based on auth state
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/genkit (Genkit API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/genkit).*)',
  ],
};
