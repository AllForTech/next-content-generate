'use client';
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLoadingSkeleton } from '@/components/ui/ContentLoadingSkeleton';
import '@mdxeditor/editor/style.css';
import rehypeRaw from 'rehype-raw';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useContent } from '@/context/GenerationContext';

interface ContentRendererProps {
  isLoading: boolean;
}

export const Content: React.FC<ContentRendererProps> = ({ isLoading }: { isLoading: boolean }) => {
  const {  isEditingRaw } = useGlobalState();
  const { setGeneratedContent, generatedContent } = useContent();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area


  useEffect(() => {
    if (!isLoading && generatedContent && !isEditingRaw) {
      timerRef.current = setTimeout(() => {
        setGeneratedContent(generatedContent);
      }, 100)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [generatedContent, isLoading, isEditingRaw]);


  return (
    <div className={cn('w-full h-full relative center !justify-start flex-col rounded-2xl bg-white')}>
        <ScrollArea ref={scrollAreaRef} className={cn('container-full absolute inset-0 center px-1 md:px-4 py-2.5 flex-col !justify-start')}
                    id={'hide-scrollbar'}
        >

          {isLoading ? (
            <ContentLoadingSkeleton/>
          ): (
            <article className={cn('container-full  flex markdown prose flex-col !m-0 !justify-start')}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                >
                  {generatedContent}
                </ReactMarkdown>
            </article>
          )}
        </ScrollArea>
    </div>
  );
};

