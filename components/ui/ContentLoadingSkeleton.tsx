'use client'
import React from 'react'
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader} from "lucide-react";

export const ContentLoadingSkeleton = () => {

  return (
    <div className={cn('container-full flex flex-col gap-5 p-4 md:p-6')}>

      {/* 1. Header and Loader */}
      <div className={cn('w-full h-fit flex items-center gap-3 border-b border-neutral-200/50 pb-3')}>
        <Loader className={cn('animate-spin text-black')} size={18}/>
        <p className={cn('text-foreground/80 font-medium text-sm tracking-wide')}>
          Generating Content. Please wait...
        </p>
      </div>

      {/* 2. Main Title/Heading Skeleton */}
      <div className="w-full">
        <Skeleton className={'w-3/4 h-8 rounded-md bg-neutral-300/50 dark:bg-neutral-700/80'} />
      </div>

      {/* 3. Sub-Heading/Metadata Skeleton */}
      <div className="w-full flex space-x-4">
        <Skeleton className={'w-2/5 h-4 rounded-full bg-neutral-300/40 dark:bg-neutral-700/60'} />
        <Skeleton className={'w-1/5 h-4 rounded-full bg-neutral-300/40 dark:bg-neutral-700/60'} />
      </div>

      {/* 4. Main Content Block Skeleton (Mimics paragraphs/code) */}
      <div className={'w-full space-y-3'}>
        {/* Paragraph 1 */}
        <Skeleton className={'w-full h-4 rounded-sm bg-neutral-300/50 dark:bg-neutral-700/80'} />
        <Skeleton className={'w-[95%] h-4 rounded-sm bg-neutral-300/50 dark:bg-neutral-700/80'} />
        <Skeleton className={'w-[70%] h-4 rounded-sm bg-neutral-300/50 dark:bg-neutral-700/80'} />

        {/* Spacer */}
        <div className="h-4"></div>

        {/* Paragraph 2 */}
        <Skeleton className={'w-full h-4 rounded-sm bg-neutral-300/50 dark:bg-neutral-700/80'} />
        <Skeleton className={'w-[80%] h-4 rounded-sm bg-neutral-300/50 dark:bg-neutral-700/80'} />
        <Skeleton className={'w-[90%] h-4 rounded-sm bg-neutral-300/50 dark:bg-neutral-700/80'} />

        {/* Large Block/Footer (Mimics CTA or Summary) */}
        <div className="pt-6">
          <Skeleton className={'w-1/2 h-10 rounded-lg bg-neutral-500/30 dark:bg-neutral-800/50'} />
        </div>
      </div>

    </div>
  )
}