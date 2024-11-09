import Link from 'next/link';
import './Header.css';
import Logo from '@/app/utils/logo';
import Hamburger from '@/app/utils/hamburger';
export default function Header() {
  return (
    <header>
      <div className="title-cont">
        <Logo />
      </div>
      <nav>
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/services" className="nav-link">
          Services
        </Link>
        <Link href="/tasks" className="nav-link">
          Tasks
        </Link>
        <Link href="/about" className="nav-link">
          About
        </Link>
        {/* <Link href="/products?page=1" className="nav-link">
          Products
        </Link> */}
      </nav>
      <div className="registration-cont">
        {/* Next linting rules might suggest using the Link component instead of an anchor tag. 
        The Link component is meant to perform client-side transitions between pages. 
        As the link points to an API route and not to a page, you should keep it as an anchor tag. */}
        <a href="/api/auth/logout" className="logout">
          Log out
        </a>
      </div>
      <Hamburger />
    </header>
  );
}
