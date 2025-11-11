'use client'
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import Prompt from "@/components/Layout/Dashboard/Generate/Prompt";
import { ContentRenderer } from "@/components/Layout/Dashboard/Generate/ContentRenderer";
import { useContent } from '@/context/GenerationContext';
import ContentGenerator from '@/components/Layout/Dashboard/Generate/RendererWithHighlight';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface GenerateContentProps {
    contentType: string;
    contentId: string;
    content: any;
}

export const GenerateContent = ({ contentType, contentId, content }: GenerateContentProps) => {
    const {
      generateContent,
      isLoading,
      generatedContent,
      setGeneratedContent,
    } = useContent();

  useEffect(() => {
    if (!content || !contentId) {
      setGeneratedContent('# No content found.');
    }

    setGeneratedContent(content?.main_content);

  }, [content, contentId]);



    return (
        <div className={cn('container-full overflow-hidden gap-3.5 p-3.5 relative center flex-row')} id={'hide-scrollbar'}>
            <ContentRenderer isLoading={isLoading} content={generatedContent} />
          {/*<ContentGenerator content={generatedContent}/>*/}
            <Prompt onGenerate={generateContent} contentType={contentType} contentId={contentId} />
            {generatedContent && (
                <div className="absolute bottom-4 right-4">
                    <Link href={`/dashboard/content/${contentId}`}>
                        <Button>View Saved Content</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};