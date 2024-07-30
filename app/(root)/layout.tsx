import type { Metadata } from 'next';
import { Header } from '@/components/shared';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pizza',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen'>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
