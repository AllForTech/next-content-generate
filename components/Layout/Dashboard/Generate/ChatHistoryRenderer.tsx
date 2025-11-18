'use client'
import React from 'react';
import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatHistoryType, useContent} from "@/context/GenerationContext";
import Loader from "@/components/ui/Loader";
import { User, Bot } from 'lucide-react'; // Added icons for professional touch

export function ChatHistoryRenderer(){
  const {
    chatHistory,
    isLoading
  } = useContent();

  return (
    // 🛑 Removed 'container-full center' from outer div to allow content to flow naturally
    <div className={cn('w-full h-full p-4')}>
      <ScrollArea
        // 🛑 Adjusted alignment to stack content properly
        className={cn('w-full h-full flex flex-col gap-3')}
      >
        {/* 🛑 Added check for an empty history state */}
        {!isLoading && chatHistory && chatHistory.length === 0 && (
          <div className="text-center text-sm text-neutral-500 py-10">
            Start a conversation to see history here.
          </div>
        )}

        {chatHistory && chatHistory.map((history) => (
          // 🛑 Using history.id directly in key ensures uniqueness
          <HistoryCard key={history.id} history={history}/>
        ))}

        {isLoading && (
          <Loader
            text={'AI is generating...'}
            // 🛑 Styled loader to align with the 'agent' response style
            className={cn('w-full text-xs my-2.5 h-fit p-3 flex items-start justify-start rounded-xl bg-neutral-200 border border-neutral-300')}
          />
        )}
      </ScrollArea>
    </div>
  )
}


const HistoryCard = ({history}: {history: ChatHistoryType}) => {
  const { replaceCurrentContent } = useContent();

  // Determine roles and styling
  const isUser = history?.role === 'user';
  const alignClass = isUser ? 'justify-end' : 'justify-start';
  const cardClass = isUser
    ? 'bg-stone-300 border border-neutral-350 text-foreground/90 rounded-b-xl rounded-tl-xl'
    : 'bg-white border border-neutral-300 text-foreground/90 rounded-b-xl rounded-tr-xl shadow-sm w-full'; // Agent gets full width
  const icon = isUser ? User : Bot;
  const iconColor = isUser ? 'text-neutral-600' : 'text-blue-600';


  return (
    <div className={cn(
      'flex w-full mb-2', // Use flex for alignment
      alignClass,
      { 'pl-8': isUser, 'pr-8': !isUser } // Add padding to one side for a "bubble" effect
    )}>
      <div className={cn('flex items-start gap-3 w-full max-w-[850px]', alignClass)}>

        {/* 1. Icon (Only on Agent side for clean bubble look) */}
        {!isUser && (
          <div className="h-6 w-6 flex-shrink-0 mt-1 center rounded-full bg-neutral-100 border border-neutral-300">
            <Bot className="h-4 w-4 text-black-600" />
          </div>
        )}

        {/* 2. Content Card/Bubble */}
        <div
          onClick={() => {
            console.log(history.id);
            // Logic maintained: replace current content on click
            replaceCurrentContent(history);
          }}
          // 🛑 Applied sophisticated styling: rounded corners, shadow, padding
          className={cn(
            'w-fit h-fit p-3 cursor-pointer transition-shadow duration-200 hover:shadow-md',
            cardClass,
            isUser ? 'ml-auto' : 'mr-auto' // Use margin auto for better alignment
          )}>

          {history?.role === 'user' ? (
            <p
              // 🛑 Maintained text size but improved wrap and alignment
              className={cn('text-xs text-wrap max-w-full', isUser ? 'text-right' : 'text-left')}
            >{history?.content}</p>
          ) : (
            // 🛑 Placeholder for the actual generated content summary or card
            <div className={cn('container-full h-[45px] center p-2 bg-neutral-100 rounded-lg text-xs text-neutral-500')}>
              Click to view/edit generated content (ID: {history.id})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};