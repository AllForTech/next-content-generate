'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {useGlobalState} from "@/context/GlobalStateContext";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import RenderContentType from '@/components/Layout/Dashboard/Create/RenderContentType';
import { Textarea } from '@/components/ui/textarea';
import { useContent } from '@/context/GenerationContext';

export function NewContentDialog(){
    const {
        createContentDialogOpen,
        setCreateContentDialogOpen
    } = useGlobalState();

    const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
    const [tagsInput, setTagsInput] = useState<string>('');
    const { handleSelection } = useContent();

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
            <RenderContentType onSelectContentType={setSelectedContentType} />
            {selectedContentType && (
              <div className={cn('w-full p-6')}>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags (comma-separated)
                </label>
                <Textarea
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g., AI, Machine Learning, Content Generation"
                  className="mt-1 block w-full"
                />
                <Button
                  onClick={() => handleSelection(selectedContentType, tagsInput.split(',').map(tag => tag.trim()))}
                  className="mt-4 w-full"
                >
                  Create Content
                </Button>
              </div>
            )}
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