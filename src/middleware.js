import { NextResponse } from 'next/server';

// Define protected routes, including all subpaths
const protectedRoutes = [
  '/my-account',
  '/profile'
];

export function middleware(req) {

  const token = req.cookies.get('token'); // Get the token from cookies

  if (!token && req.nextUrl.pathname !== '/login') {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continue processing the request if the token exists
  return NextResponse.next();
}

// Apply middleware to specific paths, including all nested routes
export const config = {
  matcher: ['/my-account/:path*', '/profile/:path*'], // Match nested routes

};








