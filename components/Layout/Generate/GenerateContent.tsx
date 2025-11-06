'use client'
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Prompt } from "@/components/Layout/Generate/Prompt";
import { ContentRenderer } from "@/components/Layout/Generate/ContentRenderer";

export const GenerateContent = () => {
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (prompt: string) => {
        setIsLoading(true);
        setGeneratedContent('');
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.body) {
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunkValue = decoder.decode(value);
                setGeneratedContent((prev) => prev + chunkValue);
                console.log(generatedContent);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('container-full overflow-hidden gap-3.5 p-3.5 relative between flex-row')} id={'hide-scrollbar'}>
            <ContentRenderer isLoading={isLoading} content={generatedContent} />
            <Prompt onGenerate={handleGenerate} />
        </div>
    );
};