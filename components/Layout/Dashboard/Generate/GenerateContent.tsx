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
      id: hs.session_id || '',
      role: 'agent' as 'agent' | 'user',
      content: hs.content || '',
      searchResults: hs.source || [],
      scrapedData: hs.screpedData || [],
      images: hs.images || [],
      attachedFile: hs.attachedFIle
    }))
    setUnsplashImages(history.images);
    setContentSources(history.searchResults);
    setScrapedData(history.scrapedData);
    setChatHistory(chatHistory)
  }, [allHistory, contentId]);

  useEffect(() => {
    if (!history || !contentId) {
      setGeneratedContent('# No content found.');
    }

    setCurrentSessionId(history?.session_id)
    console.log(history?.session_id);
    setGeneratedContent(history?.content);

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