'use client'
import React from  'react'
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader} from "lucide-react";

export const ContentLoadingSkeleton = () => {

    return (
        <div className={cn('container-full center flex-col gap-3')}>
            <div className={cn('w-full h-fit gap-3 flex justify-start')}>
                <Loader className={cn('animate-spin')} size={17}/>
                <p className={cn('text-foreground/80 font-semibold text-xs')}>Loading...</p>
            </div>
            <Skeleton className={'w-full h-[30px]'} />
            <Skeleton className={'w-full h-[60dvh]'} />
            <Skeleton className={'w-full h-[100px]'} />
        </div>
    )
}