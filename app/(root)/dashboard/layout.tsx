import React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/Layout/Navigations/Sidebar';
import { Navbar } from '@/components/Layout/Navigations/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn('screen flex flex-row overflow-hidden bg-white', 'items-center justify-center')}
    >
      <Sidebar />
      <main className={cn('flex h-full flex-1 flex-col overflow-hidden')}>
        <Navbar />

        <div className={'flex-1 overflow-hidden rounded-2xl bg-white'}>{children}</div>
      </main>
    </div>
  );
}
