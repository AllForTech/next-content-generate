'use client'
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Prompt } from "@/components/Layout/Generate/Prompt";
import { ContentRenderer } from "@/components/Layout/Generate/ContentRenderer";
import { useContent } from '@/context/GenerationContext';
import ContentGenerator from '@/components/Layout/Generate/RendererWithHighlight';

export const GenerateContent = () => {
    const {
      generateContent,
      isLoading,
      generatedContent
    } = useContent();

    return (
        <div className={cn('container-full overflow-hidden gap-3.5 p-3.5 relative between flex-row')} id={'hide-scrollbar'}>
            {/*<ContentRenderer isLoading={isLoading} content={generatedContent} />*/}
          <ContentGenerator content={generatedContent}/>
            <Prompt onGenerate={generateContent} />
        </div>
    );
};