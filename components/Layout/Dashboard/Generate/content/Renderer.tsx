'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  contentRendererTabsState, useContent,
} from '@/context/GenerationContext';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import { Content } from '@/components/Layout/Dashboard/Generate/ContentRenderer';
import { MarkdownViewer } from '@/components/Layout/Dashboard/Generate/content/MarkdownViewer';
import { Source } from '../RightSidebarPanel';


const Editor = dynamic(() => import('../Editor/Editor'), {
  // Make sure we turn SSR off
  ssr: false,
  loading: () =>  <Skeleton className={'container-full !h-[75dvh]'}/>
})

export default function Renderer(){
  const {
    isLoading
  } = useContent();

  return (
    <div className={'container-full overflow-hidden shadow-md shadow-stone-400 rounded-lg flex-col gap-2.5 center'}>
      <Tabs defaultValue={contentRendererTabsState.content} className={'container-full p-1.5 center flex-col gap-2'}>
        <RendererTabs/>
        <div className='container-full overflow-hidden center'>
          <TabsContent className={'container-full'} value={contentRendererTabsState.content}>
            <Content isLoading={isLoading} />
          </TabsContent>
          <TabsContent className={'container-full relative'} value={contentRendererTabsState.editor}>
            <Editor/>
          </TabsContent>
          <TabsContent className={'container-full relative'} value={contentRendererTabsState.sources}>
            <Source/>
          </TabsContent>
          <TabsContent className={'container-full overflow-hidden'} value={contentRendererTabsState.markdown}>
            <MarkdownViewer/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

const RendererTabs = ( ) => {
  const { generatedContent } = useContent();

  return (
    <div className={'w-full h-fit flex-col gap-2.5 center'}>
      <TabsList className={cn('w-full bg-stone-200 center gap-2')}>
        {Object.values(contentRendererTabsState).map(tab => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn('text-xs font-semibold data-[state=active]:bg-neutral-900 data-[state=active]:text-white capitalize transition-300',
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}