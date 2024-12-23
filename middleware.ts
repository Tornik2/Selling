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

async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip locale redirect for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if the pathname includes a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there's no locale in the URL path
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

  return NextResponse.next();
}

// Use `withMiddlewareAuthRequired` to wrap the middleware for authentication
export default withMiddlewareAuthRequired(middleware);

export const config = {
  matcher: [
    // Match all pathnames except static files and auth routes
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
};
