'use client';
import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  X,
  Link as LinkIcon,
  Plus,
  Paperclip,
  Send,
  Settings2,
  Sparkles,
  SlidersHorizontal,
  Eye,
  Trash2,
} from 'lucide-react';
import { useContent } from '@/context/GenerationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface PromptInputAreaProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onRefineClick: () => void; // Function to open a refinement modal/panel
  onViewSourceClick: () => void; // Function to open the prompt viewing panel
}

export type PromptProps = {
  onGenerate: (
    prompt: string,
    tags?: string[],
    tone?: string,
    urls?: string[],
    attachedFile?: any,
  ) => void;
  contentType: string;
  contentId: string;
};

const tones = [
  'Professional',
  'Casual',
  'Witty',
  'Sarcastic',
  'Academic',
  'Technical',
  'Friendly',
  'Authoritative',
];

// --- NEW TONE SELECTOR COMPONENT ---
const ToneSelector = ({ selectedTone, setTone }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((t) => (
        <motion.button
          key={t}
          type="button"
          onClick={() => setTone(t)}
          // Animation for press effect
          whileTap={{ scale: 0.95 }}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-normal transition-all duration-300',
            // Active State: Black background, White text, Indigo ring
            t === selectedTone
              ? 'border-black bg-black text-white ring-2'
              : // Inactive State: White background, Black text, subtle border
                'border-black/20 bg-white text-black/80 hover:border-black',
          )}
        >
          {t}
        </motion.button>
      ))}
    </div>
  );
};

const Prompt = ({ onGenerate, contentType = '', contentId }: PromptProps) => {
  const [tags, setTags] = useState('');
  const [tone, setTone] = useState('Professional');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);

  const { setIsRefining, setIsViewingGoal, prompt, setPrompt } = useContent();

  const handleRefineClick = () => {
    setIsRefining(true);
    setIsViewingGoal(false);
  };

  const handleViewSourceClick = () => {
    setIsViewingGoal(true);
    setIsRefining(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    onGenerate(prompt, tagsArray, tone, urls, attachedFile);
  };

  const handleFileAttach = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Limit file size to 5MB (Example limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setAttachedFile({
        name: file.name,
        data: e.target.result, // Base64 data string
        type: file.type,
      });
      toast.success(`${file.name} attached successfully!`);
    };
    reader.readAsDataURL(file); // Reads file as Base64 string
    event.target.value = null; // Reset input for next upload
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    toast.info('Attachment removed.');
  };

  return (
    <ScrollArea className={cn('center !h-full flex-1 flex-col !justify-start')}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'flex h-full flex-1 flex-col overflow-hidden rounded-2xl p-4',
          'border border-black/5 bg-white/95 backdrop-blur-sm',
          'shadow-xl shadow-black/10 transition-shadow duration-300', // Subtle floating shadow
        )}
      >
        <form onSubmit={handleSubmit} className="container-full between flex-col gap-4">
          {/* TONE SELECTOR (Replaced NativeSelect) */}
          <div className="flex w-full flex-col gap-2.5">
            <Label className="text-xs font-semibold text-black">Tone</Label>
            <ToneSelector selectedTone={tone} setTone={setTone} />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <RenderFileAttachment
              attachedFile={attachedFile}
              handleFileAttach={handleFileAttach}
              handleRemoveFile={handleRemoveFile}
            />
          </div>

          {/* RenderReferenceUrl Component */}
          <div className="flex w-full flex-col gap-2.5">
            <RenderReferenceUrl url={url} setUrl={setUrl} urls={urls} setUrls={setUrls} />
          </div>

          {/* Prompt Textarea */}
          <PromptInputArea
            prompt={prompt}
            setPrompt={setPrompt}
            onRefineClick={handleRefineClick}
            onViewSourceClick={handleViewSourceClick}
          />
        </form>
      </motion.div>
    </ScrollArea>
    // Enhanced Floating Card Style
  );
};

export default Prompt;

const PromptInputArea = ({
  prompt,
  setPrompt,
  onRefineClick,
  onViewSourceClick,
}: PromptInputAreaProps) => {
  // Determine if the submit button should be active
  const isPromptEmpty = prompt.trim().length === 0;

  return (
    // 1. Main container: Elevated and slightly inset appearance
    <div className={cn('center w-full flex-col bg-white')}>
      {/* Optional: Descriptive header or context area */}
      <div className="mb-1 flex w-full items-center justify-between">
        <Label htmlFor="prompt" className="text-xs font-medium text-neutral-600">
          <Sparkles className="mr-1 inline h-3 w-3" />
          ThinkInk AI Prompt
        </Label>
        {/* Optional quick action for prompt templates */}
        <Button
          variant="ghost"
          type={'button'}
          className="h-6 px-2 text-xs text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-black"
        >
          View Templates
        </Button>
      </div>

      {/* 2. Textarea and Submit Button Container */}
      <div className="flex w-full items-end gap-2">
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your detailed research prompt here... (Shift + Enter for new line)"
          // Key change: Compact appearance with max height, integrated border
          className={cn(
            'h-[160px] w-full resize-none rounded-lg border-none bg-white p-3 text-sm shadow-inner ring-2 ring-neutral-300',
            'transition-shadow focus:ring-2 focus:ring-neutral-600 focus:outline-none',
            'overflow-y-auto', // Ensure scrollbar appears when limit is hit
          )}
          // Custom logic for submission on Enter (without Shift) would be handled here via onKeyDown
        />
      </div>

      {/* 3. Prompt Refinement/Action Toolbar */}
      <div className="mt-2 flex w-full justify-end gap-2 border-t border-black/10 pt-2">
        {/* Refine Button */}
        <Button
          onClick={onRefineClick}
          type={'button'}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
          disabled={isPromptEmpty}
        >
          <SlidersHorizontal className="mr-1 h-3.5 w-3.5" />
          Refine Prompt
        </Button>

        {/* View Source/Goal Button */}
        <Button
          type={'button'}
          onClick={onViewSourceClick}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
        >
          <Eye className="mr-1 h-3.5 w-3.5" />
          View Goal
        </Button>

        {/* Optional: Settings/Model Select */}
        <Button
          type={'button'}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
        >
          <Settings2 className="h-4 w-4" />
        </Button>

        {/* Submit Button */}
        <Button
          type={'submit'}
          disabled={isPromptEmpty}
          className={cn(
            'h-10 w-10 flex-shrink-0 bg-black p-0 text-white transition-colors hover:bg-neutral-800',
            'disabled:bg-neutral-300 disabled:text-neutral-500',
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="my-0.5" />
    </div>
  );
};

// --- RenderReferenceUrl Component (No change, repeated for completeness) ---
const RenderReferenceUrl = ({
  setUrl,
  url,
  urls,
  setUrls,
}: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleAdd = () => {
    if (!url.trim()) {
      toast.error('URL cannot be empty.');
      return;
    }
    const normalizedUrl = url.trim();
    const exists = urls.includes(normalizedUrl);
    if (exists) {
      toast.warning('URL already added!');
      return;
    }
    // Basic URL validation (optional, but good practice)
    if (!normalizedUrl.startsWith('http')) {
      toast.error('URL must start with http or https.');
      return;
    }
    setUrls((prev) => [...prev, normalizedUrl]);
    setUrl(''); // Clear input after adding
  };

  const handleRemove = (urlToRemove: string) => {
    setUrls((prev) => prev.filter((u) => u !== urlToRemove));
  };

  return (
    <div className={'center mb-3 h-fit w-full flex-col gap-3 overflow-x-hidden'}>
      <div className={cn('flex w-full items-end justify-between')}>
        <Label htmlFor="url" className="text-xs font-semibold text-black">
          Reference URLs
        </Label>
      </div>

      {/* URL Input with Add Button */}
      <div className="flex w-full gap-2">
        <div className="relative flex-grow">
          <LinkIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-black/60" />
          <Input
            className={cn('border-black/20 pl-10 text-sm focus:border-black')}
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="https://example.com"
          />
        </div>
        <Button
          onClick={handleAdd}
          type={'button'}
          className="h-9 bg-black px-3 text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div
        id={'hide-scrollbar'}
        className="center mt-2 max-h-40 flex-1 flex-row overflow-hidden rounded-md border border-gray-200 bg-neutral-50 p-2"
      >
        <div
          id={'hide-scrollbar'}
          className={cn(
            'absolute flex w-full flex-1 flex-row justify-start gap-2 !overflow-x-auto rounded-sm px-3',
          )}
        >
          {urls.map((url, index) => (
            <div
              key={index}
              className="mr-1 flex items-center justify-between rounded-sm bg-neutral-50 px-2 py-1 text-xs transition-colors hover:bg-neutral-200"
            >
              <LinkIcon className="mr-2 h-3 w-3 shrink-0 text-neutral-500" />
              <span className="flex-grow truncate text-neutral-700">{url?.substring(0, 30)}</span>
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-neutral-500 hover:bg-neutral-100"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RenderFileAttachment = ({ attachedFile, handleFileAttach, handleRemoveFile }) => {
  return (
    <div className={'center h-fit w-full flex-col gap-2.5 border-b border-black/10 pb-3'}>
      <div className={cn('between w-full')}>
        <Label className="text-xs font-semibold text-black">Attachment (Image or Document)</Label>

        {attachedFile ? (
          // Display attached file name and remove button
          <Button
            onClick={handleRemoveFile}
            type={'button'}
            variant={'ghost'}
            className="h-auto p-0 text-xs text-red-600 hover:text-red-700"
          >
            <X className="mr-1 h-3 w-3" /> Remove
          </Button>
        ) : (
          // Display upload button (linked to hidden input)
          <label htmlFor="file-attach-input" className="cursor-pointer text-xs">
            <Button
              asChild
              className="h-8 bg-black px-3 text-xs text-white transition-colors hover:bg-neutral-600"
            >
              <div className="flex items-center">
                <Paperclip className="mr-1 h-4 w-4" /> Attach
              </div>
            </Button>
            <input
              id="file-attach-input"
              type="file"
              onChange={handleFileAttach}
              accept="image/*, application/pdf, .doc, .docx, .txt" // Common image/document types
              className="hidden"
            />
          </label>
        )}
      </div>

      {attachedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'flex w-full items-center rounded-lg border border-indigo-200 bg-indigo-50 p-2 text-sm text-black/80',
          )}
        >
          <Paperclip className="mr-2 h-4 w-4 flex-shrink-0 text-black" />
          <span className="truncate font-medium">{attachedFile.name}</span>
          <span className="ml-auto text-xs font-bold text-black">
            {attachedFile.type.split('/')[1] || attachedFile.type}
          </span>
        </motion.div>
      )}
    </div>
  );
};
