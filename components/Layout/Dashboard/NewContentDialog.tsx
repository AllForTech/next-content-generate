'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import RenderContentType from '@/components/Layout/Dashboard/Create/RenderContentType';

export function NewContentDialog() {
  const { createContentDialogOpen, setCreateContentDialogOpen } = useGlobalState();

  return (
    createContentDialogOpen && (
      <>
        {createContentDialogOpen && (
          <div
            onClick={() => setCreateContentDialogOpen(false)}
            className={cn('!screen transition-300 absolute bg-white/20 backdrop-blur-sm')}
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'center between absolute right-1/2 bottom-1/2 h-fit w-[800px] translate-x-1/2 translate-y-1/2 flex-col rounded-2xl bg-white p-2.5 shadow-stone-300 drop-shadow-2xl drop-shadow-stone-300',
          )}
        >
          <div className={cn('container-full center flex-col')}>
            <RenderContentType />
          </div>
          <div className={cn('center h-fit w-full !justify-end gap-2.5 p-2')}>
            <Button
              type={'button'}
              onClick={() => setCreateContentDialogOpen(false)}
              className={cn('text-xs')}
            >
              close
            </Button>
          </div>
        </motion.div>
      </>
    )
  );
}
