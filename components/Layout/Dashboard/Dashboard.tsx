'use client';

import React from 'react';
import ContentCard from '@/components/Layout/Dashboard/ContentCard';
import { GoToGeneratorButton } from '@/app/(root)/dashboard/GoToGeneratorButton';
import Search from '@/components/Layout/Dashboard/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';
import { Skeleton } from '@/components/ui/skeleton';

const ContentCardSkeleton = () => (
  <div className="flex animate-pulse flex-col space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    {/* Skeleton definition remains the same */}
    <Skeleton className="h-6 w-3/4 bg-gray-200" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-full bg-gray-200" />
      <Skeleton className="h-3 w-11/12 bg-gray-200" />
      <Skeleton className="h-3 w-5/6 bg-gray-200" />
    </div>
    <Skeleton className="mt-4 h-3.5 w-1/4 bg-gray-200" />
  </div>
);

export default function Dashboard() {
  const { allContents: contents, isDashboardLoading } = useContent();
  const skeletonCards = Array.from({ length: 6 });

  const displayContent = (isContentVisible: boolean) => {
    if (isDashboardLoading) {
      // 1. Loading State: Uses h-full inside the wrapper
      return (
        <ScrollArea className={cn('h-full w-full')}>
          <div className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {skeletonCards.map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        </ScrollArea>
      );
    }

    if (isContentVisible) {
      // 2. Data Loaded State: Uses h-full inside the wrapper
      return (
        <ScrollArea className={cn('h-full w-full rounded-md px-3')}>
          <div className="container-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content: any) => (
              <ContentCard
                key={content?.contentId}
                content={content?.content}
                prompt={content?.prompt}
                id={content?.contentId}
                createdAt={content?.createdAt}
              />
            ))}
          </div>
        </ScrollArea>
      );
    }

    // 3. Empty State: Show No Content Message
    return (
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-16 text-center">
        <p className="mb-2 text-2xl font-bold text-black">No content found.</p>
        <p className="text-md text-black">
          Start a new search or create your first piece of content!
        </p>
      </div>
    );
  };

  const isContentVisible = contents.length !== 0;

  return (
    <div className="!container-full flex !h-full flex-1 justify-center bg-white pb-16">
      <div className={cn('mx-4 h-full w-full max-w-7xl px-8 py-2.5 md:px-12 lg:mx-auto flex flex-col')}>

        <div className={cn('container-full flex flex-1 flex-col gap-4 h-full')}>

          <div className="flex flex-col items-start justify-between md:flex-row md:items-center flex-shrink-0">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-black md:mb-0">
              Your Contents
            </h1>
            <GoToGeneratorButton />
          </div>

          <div className={cn('flex flex-1 min-h-0', { 'h-[70dvh]': !isContentVisible })}>
            {displayContent(isContentVisible)}
          </div>

        </div>
      </div>
    </div>
  );
}