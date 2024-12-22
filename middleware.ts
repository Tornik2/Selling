import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { i18n } from './i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

// Define the actual middleware function
async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname includes a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there’s no locale in the URL path
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Build the new URL with the locale and include the search parameters
    const newUrl = new URL(
      `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url
    );

    // Add original query parameters to the new URL
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }
}

// Use `withMiddlewareAuthRequired` to wrap the middleware for authentication
export default withMiddlewareAuthRequired(middleware);

export const config = {
  matcher: [
    // Exclude the following routes from middleware processing:
    // 1. Static files (e.g., images, fonts, and other assets in /public)
    '/((?!api/auth|_next/static|_next/image|favicon.ico|images).*)', // <-- Excluding /images here

    // Routes that require both authentication and locale handling
    // (Will now apply to all paths except those above)
  ],
};
