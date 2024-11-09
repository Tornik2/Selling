import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from 'next-themes';

import './globals.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Prevents duplicate styles

export const metadata = {
  title: 'ServIt',
  description: 'ServIt service marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <ThemeProvider
            attribute="data-theme"
            enableSystem={true}
            defaultTheme="system"
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
