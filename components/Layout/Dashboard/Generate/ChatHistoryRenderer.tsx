'use client'
import React from 'react';
import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatHistoryType, useContent} from "@/context/GenerationContext";
import Loader from "@/components/ui/Loader";
import { User, Bot, MessageSquare } from 'lucide-react';

export function ChatHistoryRenderer(){
  const {
    chatHistory,
    isLoading
  } = useContent();

  return (
    // Component is now designed to fill the available space in the left sidebar
    <div className={cn('w-full h-full flex flex-col pt-2')}>

      <div className="text-sm font-semibold text-black px-4 pb-2 border-b border-neutral-200">
        <MessageSquare className="inline h-4 w-4 mr-2 text-neutral-600" />
        Content History
      </div>

      <ScrollArea
        className={cn('w-full flex-grow p-1')} // Use flex-grow to fill remaining vertical space
      >
        {/* 🛑 Empty history state */}
        {!isLoading && chatHistory && chatHistory.length === 0 && (
          <div className="text-center text-xs text-neutral-500 py-4 px-2">
            No history yet. Start generating content.
          </div>
        )}

        {/* 🛑 Mapped History Cards */}
        {chatHistory && chatHistory.map((history) => (
          <HistoryCard key={history.id} history={history}/>
        ))}

        {/* 🛑 Loading State */}
        {isLoading && (
          <Loader
            text={'Generating...'}
            // Styled loader for clean sidebar integration
            className={cn('w-full text-xs h-10 flex items-center justify-start px-3 text-neutral-600')}
          />
        )}
      </ScrollArea>
    </div>
  )
}


const HistoryCard = ({history}: {history: ChatHistoryType}) => {
  const { replaceCurrentContent } = useContent();

  const isUser = history?.role === 'user';
  // Use neutral palette for all colors
  const bgColor = isUser ? 'bg-neutral-100' : 'bg-white';
  const borderColor = 'border-neutral-300';
  const textColor = isUser ? 'text-black' : 'text-neutral-700';

  // Get the display content: truncate if it's the AI response
  const displayContent = isUser
    ? history?.content // User prompt is short, display fully
    : (history?.content ? history.content.substring(0, 10) + '...' : 'Content generated...');

  return (
    <div
      key={history.id}
      onClick={() => {
        console.log(history.id);
        // MAINTAINED LOGIC: Replaces current content on click
        replaceCurrentContent(history);
      }}
      className={cn(
        'flex w-full h-[50px] p-1.5 mb-1.5 cursor-pointer rounded-lg border',
        bgColor,
        borderColor,
        'transition-colors duration-150',
        'hover:bg-neutral-200 hover:border-black/50'
      )}
    >
      <div className="flex items-center gap-3 w-full">

        {/* 1. Icon (Simplified and neutral) */}
        <div className="h-6 w-6 flex-shrink-0 center rounded-full bg-neutral-200 border border-neutral-400">
          {isUser
            ? <User className="h-3.5 w-3.5 text-neutral-600" />
            : <Bot className="h-3.5 w-3.5 text-black" />
          }
        </div>

        {/* 2. Content */}
        <div className="flex flex-col justify-center overflow-hidden flex-grow">
          <p className={cn('text-xs font-medium truncate', textColor)}>
            {isUser ? 'Your Prompt' : 'AI Content'}
          </p>
          <p className="text-[11px] text-neutral-500 truncate">
            {displayContent}
          </p>
        </div>

      </div>
    </div>
  );
};