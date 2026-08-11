import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, updateSession } from './lib/auth';

export async function proxy(request: NextRequest) {
  // Update session if it exists
  const sessionResponse = await updateSession(request);
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/secure_portal_99')) {
    // Exclude the login page itself
    if (request.nextUrl.pathname === '/secure_portal_99/login') {
      // If already logged in, redirect to dashboard
      const session = await getSession();
      if (session) {
        return NextResponse.redirect(new URL('/secure_portal_99', request.url));
      }
      return NextResponse.next();
    }

    const session = await getSession();
    if (!session) {
      return NextResponse.redirect(new URL('/secure_portal_99/login', request.url));
    }
  }

  return sessionResponse || NextResponse.next();
}

export const config = {
  matcher: ['/secure_portal_99/:path*'],
};
