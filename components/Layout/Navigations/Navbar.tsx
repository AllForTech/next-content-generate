'use client';

import React from 'react'
import {cn} from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useContent } from '@/context/GenerationContext';

export const Navbar = () => {
  const {
    generatedContent,
    handleDocxExport,
  } = useContent();

    return (
        <div className={cn('center shadow-md drop-shadow-sm shadow-neutral-100 px-2.5 !justify-end w-full h-[40px]')}>
          <div className={cn('w-fit p-1.5 center gap-2.5 h-fit')}>
            <Button
              type={'button'}
              onClick={() => handleDocxExport(generatedContent)}
            >

            </Button>

          </div>
        </div>
    )
}