"use client"
import React, {useRef, useState} from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const ContentComponent = ({contents}) => {

    return (
        <div id={'markdown'} className={cn(`prose !outline-none prose-lg dark:prose-invert max-w-[700px] h-full !justify-start !pb-[30px] flex-col !items-start center`)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {contents}
            </ReactMarkdown>
        </div>
    )
}
export default ContentComponent
