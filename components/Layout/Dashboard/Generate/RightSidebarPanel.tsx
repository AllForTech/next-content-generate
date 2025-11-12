'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { panelTabsState, PanelTabsStateType, useContent } from '@/context/GenerationContext';
import { cn } from '@/lib/utils';
import { PromptProps } from '@/components/Layout/Dashboard/Generate/Prompt';
import Prompt from '@/components/Layout/Dashboard/Generate/Prompt';
import { ChatHistoryRenderer } from '@/components/Layout/Dashboard/Generate/ChatHistoryRenderer';

export const RightSidebarPanel = ({ contentType, contentId, onGenerate } :PromptProps) => {
  const { generateContent } = useContent()

  return (
    <div className={'container-full !max-w-[490px] flex-col gap-2.5 center'}>
      <Tabs defaultValue={panelTabsState.prompt} className={'container-full p-1.5 center flex-col gap-2'}>
        <PanelTabs/>
        <div className={cn('center container-full')}>
          <TabsContent className={'container-full'} value={panelTabsState.prompt}>
            <Prompt onGenerate={onGenerate} contentType={contentType} contentId={contentId} />
          </TabsContent>
          <TabsContent className={'container-full'} value={panelTabsState.history}>
            <History/>
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
    <div className={cn('container-full !w-[470px] center flex-col gap-2')}>
      <ChatHistoryRenderer/>
    </div>
  )
}
