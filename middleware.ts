import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('admin_logged_in')?.value === 'true';
  const url = req.nextUrl.clone();

  if (!isLoggedIn && url.pathname.startsWith('/admin/dashboard')) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
