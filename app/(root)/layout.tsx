import React from 'react';
import { cn } from '@/lib/utils';
import { ContextProvider } from '@/context/GenerationContext';
import { GlobalStateProvider } from '@/context/GlobalStateContext';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalStateProvider>
      <ContextProvider>
        <div className={cn('screen center flex-row bg-white')}>{children}</div>
      </ContextProvider>
    </GlobalStateProvider>
  );
}
