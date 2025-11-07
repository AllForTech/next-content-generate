'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLoadingSkeleton } from '@/components/ui/ContentLoadingSkeleton';

interface ContentRendererProps {
    content: string;
    isLoading: boolean;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, isLoading }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area


    useEffect(() => {
        if (!isLoading && content) {
           timerRef.current = setTimeout(() => {
               setDisplayedContent(content);
           }, 100)
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [content, isLoading]);

    // Effect to scroll to bottom when displayedContent changes
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [displayedContent]);


    return (
        <div className={cn('w-full h-full rounded-2xl bg-white shadow-md drop-shadow-xl shadow-neutral-300')}>
          <ScrollArea ref={scrollAreaRef} className={cn('container-full flex-col !justify-start p-7')} id={'hide-scrollbar'}>
            {isLoading ? (
              <ContentLoadingSkeleton/>
            ) : (
              <div className={cn('container-full flex-col !items-start !justify-start', displayedContent && '!max-w-[650px]')} id={'markdown'}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {displayedContent}
                </ReactMarkdown>
              </div>
            )}
          </ScrollArea>
        </div>
    );
};