'use client'

import React from 'react'
import ContentCard from "@/components/Layout/Dashboard/ContentCard";
import { GoToGeneratorButton } from '@/app/(root)/dashboard/GoToGeneratorButton';
import Search from "@/components/Layout/Dashboard/Search";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';

export default function Dashboard() {
  const { allContents: contents } = useContent();

  return (

    // Outer container for centering the floating card
    <div className="flex justify-center container-full pb-16 bg-gray-50/50">

      {/* The Floating Dashboard Card */}
      <div
        className={cn(
          "w-full h-full max-w-7xl mx-4 lg:mx-auto px-8 py-2.5 md:px-12",
          "bg-white/95 backdrop-blur-xl border border-gray-100",
          "shadow-2xl shadow-indigo-500/10 rounded-[2rem]" // Creative shadow and rounded corners
        )}
      >
        <div className={cn("flex flex-col container-full gap-3")}>

          {/* Header Section (Enhanced Typography) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl font-extrabold text-black tracking-tighter mb-4 md:mb-0">
              Your Contents
            </h1>
            {/* MAINTAINED: GoToGeneratorButton */}
            <GoToGeneratorButton />
          </div>

          {/* Search Area */}
          <div className="mb-4">
            {/* MAINTAINED: Search Component */}
            <Search placeholder="Search content by keyword or type..." />
          </div>

          {/* Content Grid Area */}
          {contents ? (
            /* MAINTAINED: ScrollArea logic and ContentCard mapping */
            <ScrollArea className={cn('w-full h-[62dvh]')}>
              <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contents && contents.map((content: any) => (
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
          ) : (
            <div className="text-center p-16 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-2xl font-bold text-indigo-700 mb-2">
                No content found.
              </p>
              <p className="text-md text-indigo-600">
                Start a new search or create your first piece of content!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}