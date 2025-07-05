"use client"
import React, {useRef, useState} from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import SkeletonCard from "@/components/SkeletonCard";

const ContentComponent = ({contents, isLoading}) => {

    return (
        <div id={'markdown'} className={cn(`prose !outline-none prose-lg dark:prose-invert max-w-[700px] h-full !justify-start !pb-[30px] flex-col !items-start center`,
            contents && '')}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {contents}
            </ReactMarkdown>
            {isLoading && (
                <SkeletonCard className={cn(`w-full h-full rounded-md`)}/>
            )}
            <div className='w-full h-fit'>
                <div className={cn(`min-w-[300px] bg-transparent h-[110px]`, !contents & isLoading && 'h-[1px]')}>
                    
               </div>
            </div>
        </div>
    )
}
export default ContentComponent
