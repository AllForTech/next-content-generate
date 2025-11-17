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
    contentId: string;
    content: any;
  history: any;
  allHistory: any[];
}

export const GenerateContent = ({ history, allHistory, contentId, content }: GenerateContentProps) => {
    const {
      generateContent,
      isLoading,
      generatedContent,
      setGeneratedContent,
      setChatHistory
    } = useContent();

  useEffect(() => {
    if (!content || !allHistory)return;

    const chatHistory = allHistory?.map((hs: any) => ({
      id: hs.session_id || '',
      role: 'agent',
      content: hs.content || '',
    }))
    setChatHistory(chatHistory)
  }, [allHistory, contentId]);

  useEffect(() => {
    if (!history || !contentId) {
      setGeneratedContent('# No content found.');
    }

    setGeneratedContent(history?.content);

  }, [history, contentId]);



    return (
        <div className={cn('container-full overflow-hidden gap-2.5 pl-3.5 pr-2 relative center flex-row')} id={'hide-scrollbar'}>
            <ContentRenderer isLoading={isLoading} content={generatedContent} />
          <RightSidebarPanel onGenerate={generateContent} contentId={contentId}/>
        </div>
    );
};