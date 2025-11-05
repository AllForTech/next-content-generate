'use client';
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PromptProps {
    onGenerate: (prompt: string) => void;
}

export const Prompt: React.FC<PromptProps> = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(prompt);
    };

    return (
        <div className={cn('w-[80%] absolute bottom-[20px] !h-fit p-[5px] center')}>
            <form onSubmit={handleSubmit} className={cn('center w-full h-[150px] border rounded-md border-neutral-700 bg-neutral-300 p-4 flex flex-col gap-4')}>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="w-full h-full resize-none"
                />
                <Button type="submit" className="w-full">
                    Generate
                </Button>
            </form>
        </div>
    );
};