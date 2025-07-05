'use client'
import React, {useRef} from 'react'
import { cn } from "@/lib/utils";
import SaveAsPdf from "@/components/saveAsPDF";
import ContentComponent from "@/components/content/ContentComponent";
import { Skeleton } from '@/components/ui/skeleton'
import SkeletonCard from "@/components/SkeletonCard";

const ContentWrapper = ({response,containerRef, className, isLoading, setIsLoading}) => {


    return (
        <div className={`center container-full !w-full flex-col text-black p-[10px] !justify-between text-wrap`} id={'no-scrollbar'}>
            <div ref={containerRef} className={cn(`center container-full flex-col !w-full overflow-y-auto p-[10px] rounded-md`, className)} id={'no-scrollbar'}>
                <ContentComponent contents={response} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
        </div>
    )
}
export default ContentWrapper
