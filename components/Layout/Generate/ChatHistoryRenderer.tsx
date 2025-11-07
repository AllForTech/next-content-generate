'use client'
import React from 'react';
import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatHistoryType, useContent} from "@/context/GenerationContext";
import Loader from "@/components/ui/Loader";

export function ChatHistoryRenderer(){
    const {
        chatHistory,
        isLoading
    } = useContent();

    return (
        <div className={cn('container-full center')}>
            <ScrollArea
                className={cn('container-full center !justify-start gap-1.5 flex-col')}
            >
                {chatHistory && chatHistory.map((history) => (
                    <HistoryCard key={history?.id} history={history}/>
                ))}
                {isLoading && (
                    <Loader
                        text={'generating...'}
                        className={cn('w-full text-xs my-2.5 h-fit p-3 flex items-start justify-start rounded-md bg-stone-300 border-1 border-neutral-350')}
                    />
                )}
            </ScrollArea>
        </div>
    )
}


const HistoryCard = ({history}: {history: ChatHistoryType}) => {
    const { replaceCurrentContent } = useContent();

    return (
        <div className={cn('container-full my-2.5 !h-fit flex items-start justify-end',
            history?.role === 'user' ? 'pl-[40px]' : 'justify-start'
            )}>
            <div
                onClick={() => {
                    console.log(history.id)
                    replaceCurrentContent(history)
                }}
                className={cn('w-fit h-fit p-3 flex items-start justify-end rounded-md bg-stone-300 border-1 border-neutral-350',
                history?.role === 'agent' && 'w-full'
                )}>
                {history?.role === 'user' ? (
                    <p
                        className={cn('text-xs text-foreground/80 text-wrap')}
                    >{history?.content}</p>
                ) : (
                    <div className={'container-full h-[45px]'}>

                    </div>
                )}
            </div>
        </div>
    )
}