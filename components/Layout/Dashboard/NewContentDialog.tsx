'use client'

import React from 'react';
import { motion } from 'framer-motion';
import {useGlobalState} from "@/context/GlobalStateContext";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import RenderContentType from '@/components/Layout/Dashboard/Create/RenderContentType';

export function NewContentDialog(){
    const {
        createContentDialogOpen,
        setCreateContentDialogOpen
    } = useGlobalState();


    return createContentDialogOpen && (
      <>
        {createContentDialogOpen && <div
          onClick={() => setCreateContentDialogOpen(false)}
          className={cn('absolute z-5 !screen bg-white/20 backdrop-blur-sm transition-300')}/>}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn('absolute center p-2.5 between flex-col right-1/2 bottom-1/2 translate-y-1/2 translate-x-1/2 w-[800px] h-[85%] rounded-2xl bg-white drop-shadow-2xl drop-shadow-stone-300 shadow-stone-300')}
        >
          <div className={cn('container-full center flex-col')}>
            <RenderContentType />
          </div>
          <div className={cn('w-full h-fit center !justify-end gap-2.5 p-2')}>
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
}