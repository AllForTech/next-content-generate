'use client';

import { Check, ClipboardCopy, Edit } from 'lucide-react';
import { useRef, useState } from 'react';
import { useContent } from '@/context/GenerationContext';
import EditorHighlight from '@/components/Layout/Dashboard/Generate/Editor/EditorHighlight';

export const MarkdownViewer = () => {
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef(null);

  const { generatedContent } = useContent();

  const handleCopy = async () => {
    const textToCopy = contentRef.current ? contentRef.current.innerText : '';

    if (!textToCopy) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Fallback message could be displayed here if needed
    }
  };

  const CopyIcon = isCopied ? Check : ClipboardCopy;
  const buttonText = isCopied ? 'Copied!' : 'Copy';

  return (
    <div className="container-full font-inter flex flex-col overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 shadow-xl">
      {/* Header with Copy Button and Edit Status */}
      <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-800 px-4 py-2">
        <span className="flex items-center space-x-2 text-sm font-medium text-gray-400">
          <Edit className="h-4 w-4 text-yellow-500" />
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 rounded-lg bg-stone-200 px-3 py-1 text-xs font-semibold text-black transition-colors duration-200 hover:bg-neutral-300 active:scale-[0.98]"
        >
          <CopyIcon className="h-4 w-4" />
          <span>{buttonText}</span>
        </button>
      </div>

      {/* Scrollable, Editable Content Area */}
      <div className="custom-scrollbar relative flex-1 overflow-hidden p-4">
        {/*<pre*/}
        {/*  ref={contentRef}*/}
        {/*  contentEditable="true"*/}
        {/*  className="m-0 p-2.5 text-stone-200 text-xs absolute inset-0 leading-relaxed overflow-auto h-full w-full cursor-text focus:ring-0"*/}
        {/*  dangerouslySetInnerHTML={{ __html: generatedContent }}*/}
        {/*  style={{ outline: 'none' }}*/}
        {/*  id={'hide-scrollbar'}*/}
        {/*/>*/}
        <EditorHighlight />
      </div>
    </div>
  );
};
