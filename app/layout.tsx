import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link data-rh='true' rel='icon' href='/logo.png' />
      </head>
      <body className={nunito.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
