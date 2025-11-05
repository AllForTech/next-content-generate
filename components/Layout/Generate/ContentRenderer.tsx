'use client';
import React from 'react';
import { cn } from "@/lib/utils";

interface ContentRendererProps {
    content: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {

    return (
        <div className={cn('container-full center')}>
            <p>{content}</p>
        </div>
    );
};