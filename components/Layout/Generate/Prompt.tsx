'use client';
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatHistoryRenderer } from '@/components/Layout/Generate/ChatHistoryRenderer';
import {useContent} from "@/context/GenerationContext";

interface PromptProps {
    onGenerate: (prompt: string) => void;
}

export const Prompt: React.FC<PromptProps> = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');

    const { isLoading } = useContent();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(prompt);
    };

    return (
        <div className={cn('w-[400px] bg-white shadow-xl drop-shadow-md shadow-stone-300 rounded-2xl transition-300 !h-full p-[7px] center flex-col',
        )}>
          <ChatHistoryRenderer/>
            <form onSubmit={handleSubmit} className={cn('center w-full h-[150px] transition-300 shadow-inner border rounded-md border-stone-300 bg-stone-200  p-1.5 flex flex-col gap-4',
              )}>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className={cn("w-full h-full bg-transparent resize-none border-none outline-none shadow-none")}
                />
                <Button
                    disabled={isLoading}
                    type={'submit'}
                    className="w-full">
                    Generate
                </Button>
            </form>
        </div>
    );
};