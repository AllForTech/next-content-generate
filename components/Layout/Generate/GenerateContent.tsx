'use client'
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Prompt } from "@/components/Layout/Generate/Prompt";
import { ContentRenderer } from "@/components/Layout/Generate/ContentRenderer";

export const GenerateContent = () => {
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = async (prompt: string) => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            setGeneratedContent(data.content);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cn('container-full relative center flex-col gap-2.5 p-[10px]')}>
            <ContentRenderer content={generatedContent} />
            <Prompt onGenerate={handleGenerate} />
        </div>
    );
};