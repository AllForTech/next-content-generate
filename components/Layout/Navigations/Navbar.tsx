'use client';

import React from 'react'
import {cn} from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useContent } from '@/context/GenerationContext';
import { useGlobalState } from '@/context/GlobalStateContext';

export const Navbar = () => {
  const {
    generatedContent,
    handleDocxExport,
  } = useContent();

  const { handleToggleEdit, isEditingRaw } = useGlobalState();

    return (
        <div className={cn('center shadow-md drop-shadow-sm shadow-neutral-100 px-2.5 !justify-end w-full h-[40px]')}>
          <div className={cn('w-fit p-1.5 center gap-5 h-fit')}>
            <Button onClick={handleToggleEdit} variant="outline" size="sm">
              {isEditingRaw ? 'View' : 'Edit'}
            </Button>
            <Button
              type={'button'}
              onClick={() => handleDocxExport(generatedContent)}
            >

            </Button>

          </div>
        </div>
    )
}