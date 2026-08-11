import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, updateSession } from './lib/auth';

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("admin_session")?.value;
  let hasValidSession = false;

  if (sessionCookie) {
    const parsed = await getSession();
    if (parsed) hasValidSession = true;
  }
  
  const isLoginPage = request.nextUrl.pathname.startsWith('/secure_portal_99/login');

  if (request.nextUrl.pathname.startsWith('/secure_portal_99')) {
    if (isLoginPage) {
      if (hasValidSession) {
        return NextResponse.redirect(new URL('/secure_portal_99', request.url));
      }
      return NextResponse.next();
    }

    if (!hasValidSession) {
      return NextResponse.redirect(new URL('/secure_portal_99/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/secure_portal_99/:path*'],
};
