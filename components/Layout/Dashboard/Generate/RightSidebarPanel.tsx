'use client'

import React, { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { panelTabsState, PanelTabsStateType, useContent } from '@/context/GenerationContext';
import { cn, extractMarkdownImageUrls } from '@/lib/utils';
import { PromptProps } from '@/components/Layout/Dashboard/Generate/Prompt';
import Prompt from '@/components/Layout/Dashboard/Generate/Prompt';
import { ChatHistoryRenderer } from '@/components/Layout/Dashboard/Generate/ChatHistoryRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';

export const RightSidebarPanel = ({ contentType, contentId, onGenerate } :PromptProps) => {
  const { generateContent } = useContent()

  return (
    <div className={'container-full !max-w-[420px] flex-col gap-2.5 center'}>
      <Tabs defaultValue={panelTabsState.prompt} className={'container-full p-1.5 center flex-col gap-2'}>
        <PanelTabs/>
        <div className={cn('center container-full')}>
          <TabsContent className={'container-full'} value={panelTabsState.prompt}>
            <Prompt onGenerate={onGenerate} contentType={contentType} contentId={contentId} />
          </TabsContent>
          <TabsContent className={'container-full'} value={panelTabsState.history}>
            <History/>
          </TabsContent>
          <TabsContent className={'container-full'} value={panelTabsState.source}>
            <Source/>
          </TabsContent>
          <TabsContent className={'container-full'} value={panelTabsState.images}>
            <Images/>
          </TabsContent>
        </div>
      </Tabs>

    </div>
  )
}

const PanelTabs = () => {

  return (
    <div className={'w-full h-fit flex-col gap-2.5 center'}>
      <TabsList className={cn('w-full bg-stone-200 center gap-2')}>
        {Object.values(panelTabsState).map((tab: PanelTabsStateType) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn('text-xs font-semibold transition-300',
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}

const History = () => {

  return (
    <div className={cn('container-full !w-[400px] center flex-col gap-2')}>
      <ChatHistoryRenderer/>
    </div>
  )
}

const Source = () => {
  const { contentSources, scrapedData, unsplashImages } = useContent();

  console.log(contentSources, scrapedData, unsplashImages);

  return (
    <ScrollArea className={cn('center container-full flex-col gap-2.5 !w-[400px] bg-white h-full p-4')}>
      <h3 className="text-lg font-bold text-black mb-3 border-b border-black/10 w-full pb-2">
        Content Sources & Snippets
      </h3>
      {/* Refactored source snippet style for black/white theme */}
      {contentSources && contentSources.map(source => (
        <div key={source.url} className={cn('w-full h-fit p-4 text-black text-xs mb-2.5 bg-white border border-black/20 rounded-md shadow-sm')}>
          <p className="font-semibold text-sm mb-1">{source.url.substring(0, 40)}...</p>
          <p className="text-black/80 italic">{source.snippet}</p>
        </div>
      ))}
      {contentSources.length === 0 && (
        <div className="text-center p-6 text-black/70">
          No sources found.
        </div>
      )}
    </ScrollArea>
  )
}

const Images = () => {
  const { generatedContent } = useContent();

  // Use useMemo to re-calculate URLs only when generatedContent changes
  const imageUrls = useMemo(() => {
    return extractMarkdownImageUrls(generatedContent);
  }, [generatedContent]);

  const hasImages = imageUrls.length > 0;

  return (
    <ScrollArea className={cn('center container-full max-h-[82dvh] flex-col gap-2.5 !w-[400px] bg-white h-full p-4')}>
      <h3 className="text-lg font-bold text-black mb-3 border-b border-black/10 w-full pb-2">
        Extracted Images
      </h3>
      <div className={cn('w-full h-[60px] mb-2.5 between')}>
        <h2 className={cn('text-sm font-semibold text-black')}>Upload image</h2>
        <p className={cn('text-sm font-semibold text-black')}>+</p>
      </div>
      {hasImages ? (
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* Map over the extracted URLs instead of unsplashImages */}
          {imageUrls.map((url, index) => (
            <div
              key={url + index} // Using URL + index for a unique key
              className="relative aspect-square overflow-hidden rounded-md border border-black/10 shadow-sm"
            >
              {/* Image Preview Container */}
              <div
                className="w-full h-full bg-black/10 flex items-center justify-center text-xs text-black/50"
                style={{
                  // Use the extracted URL for background image preview (optional)
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Fallback text if image preview fails */}
                <span className="p-1 bg-white/70 rounded">URL: {url.substring(0, 20)}...</span>
              </div>

              {/* Black Button Overlay */}
              <button className="absolute bottom-2 right-2 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full hover:bg-black/80 transition-colors">
                View/Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 text-black/70">
          No images found in the generated content.
        </div>
      )}
    </ScrollArea>
  )
}
