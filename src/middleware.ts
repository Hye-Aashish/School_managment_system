import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Public paths that don't need authentication
  const isPublicPath = path === '/' || path === '/api/auth/login';

  const token = request.cookies.get('auth_token')?.value || '';

  // Redirect to login if trying to access protected path without token
  if (!isPublicPath && !token) {
    // If it's an API request, return 401 Unauthorized
    if (path.startsWith('/api/')) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized Access. Session expired or missing.' },
            { status: 401 }
        );
    }
    // Otherwise redirect to the login page
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect to dashboard if trying to access login page while already logged in
  if (isPublicPath && token && path === '/') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/api/((?!auth/login).*)', // Matches all API routes except login
  ],
};
