'use client';
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatHistoryRenderer } from '@/components/Layout/Dashboard/Generate/ChatHistoryRenderer';
import {useContent} from "@/context/GenerationContext";
import { createClient } from '@/utils/supabase/client';

interface PromptProps {
    onGenerate: (prompt: string, contentType: string, tags: string[]) => void;
    contentType: string;
    contentId: string;
}

export const Prompt: React.FC<PromptProps> = ({ onGenerate, contentType, contentId }) => {
    const [prompt, setPrompt] = useState('');

    const { isLoading } = useContent();

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('contents')
                .select('tags')
                .eq('contentId', contentId)
                .single();

            if (error) {
                console.error("Error fetching tags:", error);
            } else if (data) {
                setTags(data.tags || []);
            }
        };

        if (contentId) {
            fetchTags();
        }
    }, [contentId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(prompt, contentType, tags);
    };

    return (
        <div className={cn('w-[470px] bg-white shadow-xl drop-shadow-md shadow-stone-300 rounded-2xl transition-300 !h-full p-[7px] center flex-col',
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