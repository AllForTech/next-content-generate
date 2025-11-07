import React from "react";
import {cn} from "@/lib/utils";
import { ContextProvider } from '@/context/GenerationContext';

export default function Layout({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>){

    return (
      <ContextProvider>
        <div className={cn('screen bg-white center flex-row')}>
          <main className={cn('container-full center')}>
            {children}
          </main>
        </div>
      </ContextProvider>
    )
}