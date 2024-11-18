import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from 'next-themes';
import { i18n } from '../../../i18n.config';
import './globals.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { getDictionary } from '../../../get-dictionaries';

config.autoAddCss = false; // Prevents duplicate styles
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export const metadata = {
  title: 'ServIt',
  description: 'ServIt service marketplace',
};

export default async function RootLayout({ children, params }) {
  const dictionary = await getDictionary(params.lang);
  return (
    // data-theme="dark"
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <UserProvider>
          <ThemeProvider
            attribute="data-theme"
            enableSystem={true}
            defaultTheme="system"
          >
            <Header lang={params.lang} dictionary={dictionary} />
            {children}
            <Footer lang={params.lang} dictionary={dictionary} />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
