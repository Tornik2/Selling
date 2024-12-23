'use client';
import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../../../../i18n.config';

interface LocaleSwitcherProps {
  lang: string; // Explicitly define lang prop
}

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ lang }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to update pathname with the new locale and retain search params
  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';

    const segments = pathname.split('/');
    segments[1] = locale; // Change the locale in the path

    // Retain search parameters (e.g., search query)
    const queryParams = searchParams.toString();
    const newPathname = segments.join('/');

    return queryParams ? `${newPathname}?${queryParams}` : newPathname;
  };

  // Get the locale to switch to
  const switchToLocale = i18n.locales.find((locale) => locale !== lang);

  return (
    <div>
      {switchToLocale && (
        <Link href={redirectedPathname(switchToLocale)}>
          {switchToLocale === 'en' ? 'ქარ' : 'EN'}
        </Link>
      )}
    </div>
  );
};

export default LocaleSwitcher;