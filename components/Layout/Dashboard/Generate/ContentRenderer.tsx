'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLoadingSkeleton } from '@/components/ui/ContentLoadingSkeleton';
import dynamic from 'next/dynamic'
import '@mdxeditor/editor/style.css';
import rehypeRaw from 'rehype-raw';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useContent } from '@/context/GenerationContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ContentRendererProps {
  content: string;
  isLoading: boolean;
}

const Editor = dynamic(() => import('./Editor/Editor'), {
  // Make sure we turn SSR off
  ssr: false,
  loading: () =>  <Skeleton className={'container-full !h-[75dvh]'}/>
})

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, isLoading }) => {
  const {  isEditingRaw } = useGlobalState();
  const [displayedContent, setDisplayedContent] = useState(content);
  const { setGeneratedContent } = useContent();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area


  useEffect(() => {
    if (!isLoading && content && !isEditingRaw) {
      timerRef.current = setTimeout(() => {
        setDisplayedContent(content);
        setGeneratedContent(content);
      }, 100)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [content, isLoading, isEditingRaw]);

  // Effect to scroll to bottom when displayedContent changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [displayedContent]);


  return (
    <div className={cn('w-full h-full relative center !justify-start flex-col rounded-2xl bg-white shadow-md drop-shadow-xl shadow-neutral-300')}>
        <ScrollArea ref={scrollAreaRef} className={cn('container-full center flex-col !justify-start p-7',
          // displayedContent && 'max-w-[700px]'
        )} id={'hide-scrollbar'}>
          {isLoading ? (
            <ContentLoadingSkeleton/>
          ): (
            <article className={cn('container-full flex prose markdown prose flex-col !m-0 !justify-start',
              // displayedContent && 'max-w-[650px]'
            )}
                     // id={'markdown'}
            >
              {isEditingRaw ? (
                <Editor markdown={displayedContent} setMarkdown={setDisplayedContent}/>
              ): (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                >
                  {displayedContent}
                </ReactMarkdown>
              )}
            </article>
          )}
        </ScrollArea>
    </div>
  );
};

