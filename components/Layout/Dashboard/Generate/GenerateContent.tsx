'use client'
import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useContent } from '@/context/GenerationContext';
import { RightSidebarPanel } from '@/components/Layout/Dashboard/Generate/RightSidebarPanel';
import Renderer from './content/Renderer';

interface GenerateContentProps {
    contentId: string;
  history: any;
  allHistory: any[];
}

export const GenerateContent = ({ history, allHistory, contentId }: GenerateContentProps) => {
    const {
      generateContent,
      setGeneratedContent,
      setChatHistory,
      setCurrentSessionId,
      setUnsplashImages,
      setContentSources,
      setScrapedData,
    } = useContent();

  useEffect(() => {
    if (!contentId || !allHistory)return;

    const chatHistory = allHistory?.map((hs: any) => ({
      id: hs.sessionId || '',
      role: 'agent' as 'agent' | 'user',
      content: hs.content || '',
      searchResults: hs.scrapedData || [],
      scrapedData: hs.scrapedData || [],
      images: hs.images || [],
      attachedFile: hs.attachedFIle
    }))
    setChatHistory(chatHistory);
  }, [allHistory, contentId]);

  useEffect(() => {
    if (!history || !contentId) {
      setGeneratedContent('# No content found.');
    }

    setCurrentSessionId(history?.sessionId);
    setGeneratedContent(history?.content);
    setUnsplashImages(history?.images);
    setContentSources(history?.searchResults);
    setScrapedData(history?.scrapedData);

  }, [history, contentId]);



    return (
      <div
        className={cn(
          'container-full center relative flex-row gap-2.5 overflow-hidden pr-2 pl-2.5',
        )}
        id={'hide-scrollbar'}
      >
        <Renderer/>
        <RightSidebarPanel onGenerate={generateContent} contentId={contentId} contentType={''} />
      </div>
    );
};