import React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from '@/components/Layout/Navigations/Sidebar';
import { Navbar } from '@/components/Layout/Navigations/Navbar';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
      <div className={cn('screen overflow-hidden bg-white flex flex-row', 'justify-center items-center')}>
        <Sidebar />
        <main className={cn('flex-1 flex flex-col h-full overflow-hidden')}>
          <Navbar/>

          <div className={'flex-1 bg-white  overflow-hidden rounded-2xl'}>
            {children}
          </div>
        </main>
      </div>
    );
}