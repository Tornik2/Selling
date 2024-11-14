import './Footer.css';
import Link from 'next/link';
export default function Footer({ lang, dictionary }) {
  return (
    <footer>
      <div className="footer-cont">
        <Link href="/about" className="about">
          {dictionary.footer.aboutLink}
        </Link>
        <Link href="_blank" className="Contact">
          {dictionary.footer.contactLink}
        </Link>
        <Link href="_blank" className="Policy">
          {dictionary.footer.policies}
        </Link>
      </div>
      <div className="rights"> {dictionary.footer.rights}</div>
    </footer>
  );
}
