'use client';

import React from 'react';
import ContentCard from '@/components/Layout/Dashboard/ContentCard';
import { GoToGeneratorButton } from '@/app/(root)/dashboard/GoToGeneratorButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';
import { Skeleton } from '@/components/ui/skeleton';

const ContentCardSkeleton = () => (
  <div className="flex animate-pulse flex-col space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    {/* Skeleton for the Title/Header */}
    <Skeleton className="h-6 w-3/4 bg-gray-200" />
    {/* Skeleton for the Snippet/Body */}
    <div className="space-y-2">
      <Skeleton className="h-3 w-full bg-gray-200" />
      <Skeleton className="h-3 w-11/12 bg-gray-200" />
      <Skeleton className="h-3 w-5/6 bg-gray-200" />
    </div>
    {/* Skeleton for the Date/Footer */}
    <Skeleton className="mt-4 h-3.5 w-1/4 bg-gray-200" />
  </div>
);

export default function Dashboard() {
  const { allContents: contents, isDashboardLoading } = useContent();

  const skeletonCards = Array.from({ length: 6 });

  const displayContent = () => {
    if (isDashboardLoading) {
      return (

        <div className="max-h-[70dvh]">
          <ScrollArea className={cn('h-full w-full')}>
            <div className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
              {skeletonCards.map((_, index) => (
                <ContentCardSkeleton key={index} />
              ))}
            </div>
          </ScrollArea>
        </div>
      );
    }

    if (contents.length !== 0) {
      // 2. Data Loaded State: Show Real Content
      return (
        // CRITICAL FIX: Wrap the ScrollArea in a div with a defined max-height.
        // This ensures the ScrollArea has a boundary to scroll within.
        <div className="max-h-[70dvh] w-full">
          <ScrollArea className={cn('h-full w-full center  rounded-md px-3')}>
            <div className="w-full h-fit grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
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

  return (
    // Outer container for centering the floating card
    <div className="!container-full flex flex-1 justify-center bg-white pb-16">
      {/* The Floating Dashboard Card */}
      <div className={cn('mx-4 h-full w-full max-w-7xl px-8 py-2.5 md:px-12 lg:mx-auto')}>
        {/* The innermost container that holds the header and content */}
        <div className={cn('container-full flex flex-1 flex-col gap-4')}>
          {/* Header Section */}
          <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-black md:mb-0">
              Your Contents
            </h1>
            <GoToGeneratorButton />
          </div>

          {/* Search Area (commented out) */}
          {/*<div className="mb-4">*/}
          {/* /!*<Search placeholder="Search content by keyword or type..." />*!/*/}
          {/*</div>*/}

          {displayContent()}
        </div>
      </div>
    </div>
  );
}