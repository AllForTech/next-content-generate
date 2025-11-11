'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLoadingSkeleton } from '@/components/ui/ContentLoadingSkeleton';
import { Button } from '@/components/ui/button';
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyList,
  TypographyP,
  TypographyPre,
  TypographySmall,
  TypographyTable,
} from '@/components/Layout/Dashboard/Generate/Typography';

interface ContentRendererProps {
    content: string;
    isLoading: boolean;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, isLoading }) => {
    const [displayedContent, setDisplayedContent] = useState(content);
    const [isEditingRaw, setIsEditingRaw] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area

    const handleToggleEdit = () => {
        setIsEditingRaw(prev => !prev);
    };


    useEffect(() => {
        if (!isLoading && content && !isEditingRaw) {
           timerRef.current = setTimeout(() => {
               setDisplayedContent(content);
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
        <div className={cn('w-full h-full center !justify-start flex-col rounded-2xl bg-white shadow-md drop-shadow-xl shadow-neutral-300')}>
            <div className="w-full flex justify-end p-2">
                <Button onClick={handleToggleEdit} variant="outline" size="sm">
                    {isEditingRaw ? 'View' : 'Edit'}
                </Button>
            </div>
            <ScrollArea ref={scrollAreaRef} className={cn('container-full center flex-col !justify-start p-7',
                // displayedContent && 'max-w-[700px]'
            )} id={'hide-scrollbar'}>
                {isLoading ? (
                    <ContentLoadingSkeleton/>
                ) : isEditingRaw ? (
                    <textarea
                        className="w-full h-full min-h-[500px] p-4 font-mono text-xs bg-neutral-800 text-gray-50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={displayedContent}
                        onChange={(e) => setDisplayedContent(e.target.value)}
                        spellCheck="false"
                        id={'hide-scrollbar'}
                    />
                ) : (
                    <article className={cn('container-full flex flex-col !m-0 !justify-start',
                        // displayedContent && 'max-w-[650px]'
                    )} id={'markdown'}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}

                            components={{
                                h1: TypographyH1,
                                h2: TypographyH2,
                                h3: TypographyH3,
                                h4: TypographyH4,
                                p: TypographyP,
                                menuitem: TypographyList,
                                blockquote: TypographyBlockquote,
                                code: TypographyInlineCode,
                                small: TypographySmall,
                                big: TypographyLarge,
                                pre: TypographyPre,
                                table: TypographyTable,
                            }}
                        >
                            {displayedContent}
                        </ReactMarkdown>
                    </article>
                )}
            </ScrollArea>
        </div>
    );
};

