'use client'
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import Prompt from "@/components/Layout/Dashboard/Generate/Prompt";
import { ContentRenderer } from "@/components/Layout/Dashboard/Generate/ContentRenderer";
import { useContent } from '@/context/GenerationContext';
import ContentGenerator from '@/components/Layout/Dashboard/Generate/RendererWithHighlight';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RightSidebarPanel } from '@/components/Layout/Dashboard/Generate/RightSidebarPanel';

interface GenerateContentProps {
    contentType: string;
    contentId: string;
    content: any;
  history: any[]
}

export const GenerateContent = ({ contentType, history, contentId, content }: GenerateContentProps) => {
    const {
      generateContent,
      isLoading,
      generatedContent,
      setGeneratedContent,
      setChatHistory
    } = useContent();

  useEffect(() => {
    if (!content || !history)return;

    const chatHistory = history?.map((hs: any) => ({
      id: hs.id || '',
      role: 'agent',
      content: hs.content || '',
    }))
    setChatHistory(chatHistory)
  }, [history, contentId]);

  useEffect(() => {
    if (!content || !contentId) {
      setGeneratedContent('# No content found.');
    }

    setGeneratedContent(content?.main_content);

  }, [content, contentId]);



    return (
        <div className={cn('container-full overflow-hidden gap-2.5 pl-3.5 pr-2 relative center flex-row')} id={'hide-scrollbar'}>
            <ContentRenderer isLoading={isLoading} content={generatedContent} />
          <RightSidebarPanel onGenerate={generateContent} contentType={contentType} contentId={contentId}/>
        </div>
    );
};