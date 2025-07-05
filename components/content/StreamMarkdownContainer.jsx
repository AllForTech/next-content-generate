'use client'
import React, { useEffect, useState, useRef } from 'react'
import { cn } from "@/lib/utils";
import ContentWrapper from './ContentWrapper'
import { ArrowRightIcon, ArrowLeftIcon, Copy } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {UiSheet} from "@/components/content/ui/MarkDownSheet";
import ImageDrawer from "@/components/content/ui/ImageDrawer";
import ImageRenderer from "@/components/unsplash/ImageRenderer";
import useIsMobile from "@/hooks/useIsMobile";
import SaveAsPdf from "@/components/saveAsPDF";

const StreamMarkdownContainer = ({ content, setContent, isLoading, setIsLoading, images, setImages }) => {
    const [editedMarkdown, setEditedMarkdown] = useState(content)
    const [isOpen, setIsOpen] = useState(true)
    const ref = useRef(null)
    const containerRef = useRef(null);
    const { isMobile } = useIsMobile()


        useEffect(() => {
        if (ref.current && content) {
            ref.current.innerText = content
        }
    }, [content])

    console.log(isMobile)

    const handleSave = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            const updatedText = ref.current.innerText
            setEditedMarkdown(updatedText)
            setContent(updatedText)
        }
    }

    return (
        <div  className='w-full h-full center transition-all !justify-between flex-col duration-500 overflow-hidden'>
            {isMobile ? (
                <>
                    <div className={cn(`w-[97%] h-[40px] bg-dark-theme mt-[10px] rounded-sm center gap-[5px] !justify-end`)}>
                        {images.length > 0 && (
                            <UiSheet className={'bg-dark-theme'} title={'images'}>
                                <ImageRenderer images={images}/>
                            </UiSheet>
                        )}
                        <UiSheet className={'bg-zinc-800'} title={'markdown'}>
                            <MarkDownEditor content={content} ref={ref} isOpen={isOpen} handleSave={handleSave}/>
                        </UiSheet>
                        <SaveAsPdf contentRef={containerRef} content={content}/>
                    </div>
                    <ContentWrapper containerRef={containerRef} response={content} className={cn(`bg-white`,"bg-dark-theme dark:!bg-zinc-950")} isLoading={isLoading} setIsLoading={setIsLoading}/>
                </>
            ) : (
                <>
                    <ResizablePanelGroup direction="horizontal" >
                        <ResizablePanel defaultSize={48} className={'!min-w-[200px]'}>
                            <ContentWrapper containerRef={containerRef} response={content} className={cn("bg-dark-theme dark:!bg-zinc-950")} isLoading={isLoading} setIsLoading={setIsLoading}/>
                        </ResizablePanel>
                        <ResizableHandle withHandle className={'!h-[97%] w-[1px] bg-zinc-400 dark:bg-white/80'}/>
                        <ResizablePanel defaultSize={52} className={'p-[10px] center !min-w-[200px]'}>
                            <MarkDownEditor content={content} ref={ref} isOpen={isOpen} handleSave={handleSave}/>
                        </ResizablePanel>
                        {images.length > 0 && (
                            <div className={cn(`absolute bottom-[23px] w-fit !justify-between gap-[15px] right-[25px] center w-fit h-fit rounded-sm`)}>
                                <SaveAsPdf contentRef={containerRef} content={content} className={'!bg-white !text-black'} iconClassName={'!fill-black'}/>
                                <ImageDrawer>
                                    <ImageRenderer images={images}/>
                                </ImageDrawer>
                            </div>
                        )}
                    </ResizablePanelGroup>
                </>
            )}
        </div>
    )
}

export default StreamMarkdownContainer

const MarkDownEditor = ({isOpen, content, ref, handleSave}) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (ref.current && content) {
            ref.current.innerText = content
        }
    }, [content])

    const handleCopy = async () => {
        setCopied(true)
        await navigator.clipboard.writeText(content)
        setTimeout(()=> {
            setCopied(false)
        }, 3000)
    }

    return(
        <div
            id='stream-markdown'
            className={cn(
                `w-full p-[10px] relative overflow-hidden bg-zinc-800 rounded-md h-full transition-all duration-500 center text-wrap text-xs text-white/80`,
                !isOpen && 'w-0 p-0'
            )}
        >
            <div className={cn(`absolute top-0 center !justify-end w-full py-[5px] px-[10px] h-[5%] pt-[10px]`)}>
                <button onClick={handleCopy} type={'button'} className={'button cursor-pointer center gap-[4px] text-xs text-white p-[5px]'}>
                    {!copied ? (
                        <>
                            <Copy size={18}/>
                            copy
                        </>
                    ) : (
                        <span className={"text-xs text-green-400"}>copied</span>
                    )}
                </button>
            </div>
            <div className='center absolute w-full h-[95%] bottom-0 overflow-auto !items-start !justify-start flex-col'>
                    <pre
                        ref={ref}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onKeyDown={handleSave}
                        className='center outline-none border-none p-[20px] w-full h-full !items-start !justify-start flex-col whitespace-pre-wrap'
                    />
            </div>
        </div>
    )
}

