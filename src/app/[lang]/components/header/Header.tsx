// Header.tsx
import { FC } from 'react';
import Link from 'next/link';
import './Header.css';
import Logo from '../../utils/logo';
import Hamburger from '../../utils/hamburger';
import ThemeToggle from './themeToggle';
import LocaleSwitcher from './languageSwitcher';

interface HeaderProps {
  lang: string;
  dictionary: {
    header: {
      home: string;
      services: string;
      tasks: string;
      aboutLink: string;
      logout: string;
      products: string;
    };
  };
}

const Header: FC<HeaderProps> = ({ lang, dictionary }) => {
  return (
    <header>
      <div className="title-cont">
        <Logo />
      </div>
      <nav>
        <Link href={`/${lang}`} className="nav-link">
          {dictionary.header.home}
        </Link>
        <Link href={`/${lang}/services`} className="nav-link">
          {dictionary.header.services}
        </Link>
        <Link href={`/${lang}/products`} className="nav-link">
          {dictionary.header.products}
        </Link>
        <Link href={`/${lang}/about`} className="nav-link">
          {dictionary.header.aboutLink}
        </Link>
      </nav>
      <div className="registration-cont">
        <LocaleSwitcher lang={lang} />
        <a href="/api/auth/logout" className="logout">
          {dictionary.header.logout}
        </a>
        <ThemeToggle />
      </div>
      <Hamburger />
    </header>
  );
};

export default Header;
