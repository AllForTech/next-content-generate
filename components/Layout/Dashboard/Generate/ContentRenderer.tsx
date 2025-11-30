'use client';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLoadingSkeleton } from '@/components/ui/ContentLoadingSkeleton';
import '@mdxeditor/editor/style.css';
import rehypeRaw from 'rehype-raw';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useContent } from '@/context/GenerationContext';
import { PromptSelector } from '@/components/Layout/Dashboard/Generate/PromptSelector';

interface ContentRendererProps {
  isLoading: boolean;
}

export const Content: React.FC<ContentRendererProps> = ({ isLoading }: { isLoading: boolean }) => {
  const { isEditingRaw } = useGlobalState();
  const { setGeneratedContent, generatedContent } = useContent();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area

  useEffect(() => {
    if (!isLoading && generatedContent && !isEditingRaw) {
      timerRef.current = setTimeout(() => {
        setGeneratedContent(generatedContent);
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [generatedContent, isLoading, isEditingRaw]);

  return (
    <div
      className={cn('center overflow-hidden flex-1 relative h-full w-full flex-col !justify-start rounded-2xl bg-white')}
    >
      <ScrollArea
        ref={scrollAreaRef}
        // SCROLLAREA:
        // - h-full: Now correctly references the fixed height of its parent div.
        // - w-full: Takes full width.
        // - Removed container-full, center, and unnecessary flex-col, !justify-start
        className={cn(
          'h-full w-full relative inset-0 px-4 py-2.5 md:px-8',
        )}
        id={'hide-scrollbar'}
      >
        {isLoading ? (
          <ContentLoadingSkeleton />
        ) : !generatedContent && !isLoading ? (<PromptSelector/>) : (
          // ARTICLE CONTAINER: This is where we control the content's width.
          // - max-w-4xl mx-auto: Limits content to a readable width (e.g., 56rem) and centers it.
          // - flex-col: Ensures Markdown content stacks vertically.
          <article
            className={cn('h-fit flex-1 markdown inset-0 max-w-4xl mx-auto prose !m-0 flex flex-col !justify-start')}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
              {generatedContent}
            </ReactMarkdown>
          </article>
        )}
      </ScrollArea>
    </div>
  );
};
