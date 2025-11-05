import React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from '@/components/Layout/Navigations/Sidebar';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={cn('w-full h-screen flex flex-row')}>
            <Sidebar />
            <main className={cn('flex-1 h-full overflow-y-auto')}>
                {children}
            </main>
        </div>
    );
}