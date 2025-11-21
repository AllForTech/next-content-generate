'use client'

import React from 'react'
import ContentCard from "@/components/Layout/Dashboard/ContentCard";
import { GoToGeneratorButton } from '@/app/(root)/dashboard/GoToGeneratorButton';
import Search from "@/components/Layout/Dashboard/Search";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have a basic Skeleton component (common in shadcn/ui)

const ContentCardSkeleton = () => (
  <div className="flex flex-col space-y-3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse">
    {/* Skeleton for the Title/Header */}
    <Skeleton className="h-6 w-3/4 bg-gray-200" />
    {/* Skeleton for the Snippet/Body */}
    <div className="space-y-2">
      <Skeleton className="h-3 w-full bg-gray-200" />
      <Skeleton className="h-3 w-11/12 bg-gray-200" />
      <Skeleton className="h-3 w-5/6 bg-gray-200" />
    </div>
    {/* Skeleton for the Date/Footer */}
    <Skeleton className="h-3.5 w-1/4 bg-gray-200 mt-4" />
  </div>
);


export default function Dashboard() {
  const { allContents: contents, isDashboardLoading } = useContent();

  const skeletonCards = Array.from({ length: 6 });

  const displayContent = () => {
    if (isDashboardLoading) {
      // 1. Loading State: Show Skeleton Cards
      return (
        <ScrollArea className={cn('w-full h-[62dvh]')}>
          <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonCards.map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        </ScrollArea>
      );
    }

    if (contents.length !== 0) {
      // 2. Data Loaded State: Show Real Content
      return (
        <ScrollArea className={cn('w-full h-[62dvh]')}>
          <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="text-center p-16 bg-indigo-50 rounded-xl border border-indigo-200">
        <p className="text-2xl font-bold text-indigo-700 mb-2">
          No content found.
        </p>
        <p className="text-md text-indigo-600">
          Start a new search or create your first piece of content!
        </p>
      </div>
    );
  };

  return (

    // Outer container for centering the floating card
    <div className="flex justify-center container-full pb-16 bg-gray-50/50">

      {/* The Floating Dashboard Card */}
      <div
        className={cn(
          "w-full h-full max-w-7xl mx-4 lg:mx-auto px-8 py-2.5 md:px-12",
          "bg-white/95 backdrop-blur-xl border border-gray-100",
          "shadow-2xl shadow-indigo-500/10 rounded-[2rem]"
        )}
      >
        <div className={cn("flex flex-col container-full gap-3")}>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl font-extrabold text-black tracking-tighter mb-4 md:mb-0">
              Your Contents
            </h1>
            <GoToGeneratorButton />
          </div>

          {/* Search Area */}
          <div className="mb-4">
            <Search placeholder="Search content by keyword or type..." />
          </div>
          {displayContent()}
        </div>
      </div>
    </div>
  );
}