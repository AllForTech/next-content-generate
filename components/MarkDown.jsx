// components/MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import './markdown.css'
import {cn} from "@/lib/utils";

export default function MarkdownRenderer({ content }) {
    console.log(content)
    return (
        <div id={'markdown'} contentEditable={"true"} className={cn(`prose prose-lg dark:prose-invert`)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
