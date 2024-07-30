import type { Metadata } from 'next';
import { Header } from '@/components/shared';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pizza',
  description: 'Pizza',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <main className='min-h-screen bg-white'>
      <Header hasSearch />
      {children}
      {modal}
    </main>
  );
}
