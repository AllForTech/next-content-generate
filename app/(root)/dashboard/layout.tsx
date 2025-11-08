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
        <div className={cn('screen bg-white center flex-row')}>
            <Sidebar />
            <main className={cn('center container-full flex-col')}>
              <Navbar/>
              <div className={'container-full bg-white overflow-hidden rounded-2xl'}>
                {children}
              </div>
            </main>
        </div>
    );
}