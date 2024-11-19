import Link from 'next/link';
import './Header.css';
import Logo from '../../utils/logo';
import Hamburger from '../../utils/hamburger';
import ThemeToggle from './themeToggle';
import LocaleSwitcher from './languageSwitcher';
export default function Header({ lang, dictionary }) {
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
        <Link href={`/${lang}/tasks`} className="nav-link">
          {dictionary.header.tasks}
        </Link>
        <Link href={`/${lang}/about`} className="nav-link">
          {dictionary.header.aboutLink}
        </Link>
        {/* <Link href="/products?page=1" className="nav-link">
          Products
        </Link> */}
      </nav>
      <div className="registration-cont">
        <LocaleSwitcher lang={lang} />
        {/* Next linting rules might suggest using the Link component instead of an anchor tag. 
        The Link component is meant to perform client-side transitions between pages. 
        As the link points to an API route and not to a page, you should keep it as an anchor tag. */}
        <a href="/api/auth/logout" className="logout">
          {dictionary.header.logout}
        </a>
        <ThemeToggle lang={lang} />
      </div>
      <Hamburger />
    </header>
  );
}
