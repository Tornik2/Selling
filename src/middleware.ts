import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

// Configure which routes you want the middleware to run on
export const config = {
  matcher: [
    // Add routes that require authentication
    // Examples:
    '/',
    // '/api/:path*',
    // Add more routes as needed
    // Exclude authentication routes
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
