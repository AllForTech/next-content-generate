import React from "react";
import {cn} from "@/lib/utils";

export default function Layout({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>){

    return (
        <div className={cn('screen bg-white center flex-row')}>
          <main className={cn('container-full center')}>
            {children}
          </main>
        </div>
    )
}