'use client';
import React from 'react';
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
  const mockContent =
    '## 🚀 Architecting for Scale: Advanced Next.js Performance and Optimization\n' +
    '\n' +
    'To build a high-traffic, enterprise-grade application using Next.js, it is essential to move beyond basic optimization and adopt advanced architectural patterns. This document outlines critical strategies for minimizing latency, managing state efficiently, and reducing deployment costs.\n' +
    '\n' +
    '### 1. Advanced Rendering and Data Consistency\n' +
    '\n' +
    'Choosing the right data fetching and rendering strategy is the single most important architectural decision. The blend of methods is key to performance.\n' +
    '\n' +
    '#### **Incremental Static Regeneration (ISR)**\n' +
    '\n' +
    "For content that updates periodically (e.g., news feeds, product listings), **ISR** is a powerful hybrid. It allows you to update static pages *after* they've been deployed, combining the speed of Static Site Generation (SSG) with the freshness of Server-Side Rendering (SSR).\n" +
    '\n' +
    '```javascript\n' +
    '// Next.js page with ISR configured for a product detail page\n' +
    'export async function getStaticProps() {\n' +
    "  const data = await fetch('your-cms-api/products/123');\n" +
    '  return {\n' +
    '    props: { data },\n' +
    '    // Revalidate the page every 60 seconds to check for price/stock changes\n' +
    '    revalidate: 60, \n' +
    '  }\n' +
    '}';

    return (
        <div className={cn('w-full h-full rounded-2xl bg-white shadow-md drop-shadow-xl shadow-neutral-300 center'
          )}>
          <ScrollArea
            className={cn('container-full center flex-col !justify-start p-7',
              )}
            id={'hide-scrollbar'}
          >
            {isLoading ? (
              <ContentLoadingSkeleton/>
            ) : (
              <div
                className={cn('container-full center flex-col !items-start !justify-start',
                  content && '!max-w-[650px]'
                )}
                id={'markdown'}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}

                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </ScrollArea>
        </div>
    );
};