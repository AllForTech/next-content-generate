import React from "react";
import {cn} from "@/lib/utils";
import { Sidebar } from '@/components/Layout/Navigations/Sidebar';

export default function Layout({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>){

    return (
        <div className={cn('screen center flex-row')}>
          <Sidebar />

          <main className={cn('container-full')}>
            {children}
          </main>
        </div>
    )
}