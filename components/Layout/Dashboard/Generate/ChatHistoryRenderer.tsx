'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatHistoryType, useContent } from '@/context/GenerationContext';
import Loader from '@/components/ui/Loader';
import { User, Bot, MessageSquare } from 'lucide-react';

export function ChatHistoryRenderer() {
  const { chatHistory, isLoading } = useContent();

  return (
    // Component is now designed to fill the available space in the left sidebar
    <div className={cn('flex h-[200px] w-full flex-col overflow-hidden rounded-md')}>
      <div className="border-b border-neutral-200 px-4 pb-2 text-sm font-semibold text-black">
        <MessageSquare className="mr-2 inline h-4 w-4 text-neutral-600" />
        Content History
      </div>

      <ScrollArea
        className={cn('center h-[90%] w-full flex-col !justify-start p-1')} // Use flex-grow to fill remaining vertical space
      >
        {!isLoading && chatHistory && chatHistory.length === 0 && (
          <div className="px-2 py-4 text-center text-xs text-neutral-500">
            No history yet. Start generating content.
          </div>
        )}

        {chatHistory &&
          chatHistory.map((history) => <HistoryCard key={history.id} history={history} />)}

        {isLoading && (
          <Loader
            text={'Generating...'}
            // Styled loader for clean sidebar integration
            className={cn(
              'flex h-10 w-full items-center justify-start px-3 text-xs text-neutral-600',
            )}
          />
        )}
      </ScrollArea>
    </div>
  );
}

const HistoryCard = ({ history }: { history: ChatHistoryType }) => {
  const { replaceCurrentContent, currentSessionId } = useContent();

  const isUser = history?.role === 'user';
  // Use neutral palette for all colors
  const bgColor = isUser ? 'bg-neutral-100' : 'bg-white';
  const borderColor = 'border-neutral-300';
  const textColor = isUser ? 'text-black' : 'text-neutral-700';

  // Get the display content: truncate if it's the AI response
  const displayContent = isUser
    ? history?.content.substring(0, 15) + '...'
    : history?.content
      ? history.content.substring(2, 17) + '...'
      : 'Content generated...';

  return (
    <div
      key={history.id}
      onClick={() => {
        // MAINTAINED LOGIC: Replaces current content on click
        replaceCurrentContent(history);
      }}
      className={cn(
        'mb-1.5 flex h-[50px] w-full cursor-pointer rounded-lg border p-1.5',
        bgColor,
        borderColor,
        'transition-colors duration-150',
        'hover:border-black/50 hover:bg-neutral-200',
        currentSessionId === history.id && 'border-black/50 bg-neutral-200',
      )}
    >
      <div className="flex w-full items-center gap-3">
        {/* 1. Icon (Simplified and neutral) */}
        <div className="center h-6 w-6 flex-shrink-0 rounded-full border border-neutral-400 bg-neutral-200">
          {isUser ? (
            <User className="h-3.5 w-3.5 text-neutral-600" />
          ) : (
            <Bot className="h-3.5 w-3.5 text-black" />
          )}
        </div>

        {/* 2. Content */}
        <div className="flex flex-grow flex-col justify-center overflow-hidden">
          <p className={cn('truncate text-xs font-medium', textColor)}>
            {isUser ? 'Your Prompt' : 'AI Content'}
          </p>
          <p className="truncate text-[11px] text-neutral-500">{displayContent}</p>
        </div>
      </div>
    </div>
  );
};
