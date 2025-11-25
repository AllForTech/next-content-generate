'use client';
import React, { useCallback, useState } from 'react';
import { cn } from "@/lib/utils";
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
import { useContent } from "@/context/GenerationContext";
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
  onGenerate: (prompt: string, tags?: string[], tone?: string, urls?: string[], attachedFile?: any) => void;
  contentType: string;
  contentId: string;
}

const tones = ["Professional", "Casual", "Witty", "Sarcastic", "Academic", "Technical", "Friendly", "Authoritative"];

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
            'text-xs font-normal px-3 py-1 rounded-full transition-all duration-300 border',
            // Active State: Black background, White text, Indigo ring
            t === selectedTone
              ? 'bg-black text-white border-black ring-2'
              // Inactive State: White background, Black text, subtle border
              : 'bg-white text-black/80 border-black/20 hover:border-black'
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

  const {
    setIsRefining,
    setIsViewingGoal,
    prompt,
    setPrompt,
  } = useContent();

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
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
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
        type: file.type
      });
      toast.success(`${file.name} attached successfully!`);
    };
    reader.readAsDataURL(file); // Reads file as Base64 string
    event.target.value = null; // Reset input for next upload
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    toast.info("Attachment removed.");
  };

  return (
    <ScrollArea className={cn('center !justify-start flex-col !h-full flex-1')}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'flex-1 h-full p-4 overflow-hidden rounded-2xl flex flex-col',
          'bg-white/95 backdrop-blur-sm border border-black/5',
          'shadow-xl shadow-black/10 transition-shadow duration-300' // Subtle floating shadow
        )}
      >
        <form onSubmit={handleSubmit} className="container-full between flex-col gap-4">

          {/* TONE SELECTOR (Replaced NativeSelect) */}
          <div className="w-full flex flex-col gap-2.5">
            <Label className="font-semibold  text-xs text-black">Tone</Label>
            <ToneSelector selectedTone={tone} setTone={setTone} />
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <RenderFileAttachment attachedFile={attachedFile} handleFileAttach={handleFileAttach} handleRemoveFile={handleRemoveFile} />
          </div>

          {/* RenderReferenceUrl Component */}
          <div className="w-full flex flex-col gap-2.5">
            <RenderReferenceUrl url={url} setUrl={setUrl} urls={urls} setUrls={setUrls}/>
          </div>

          {/* Prompt Textarea */}
          <PromptInputArea prompt={prompt} setPrompt={setPrompt} onRefineClick={handleRefineClick} onViewSourceClick={handleViewSourceClick}/>
        </form>
      </motion.div>
    </ScrollArea>
    // Enhanced Floating Card Style
  );
};

export default Prompt;


const PromptInputArea = ({ prompt, setPrompt, onRefineClick, onViewSourceClick }: PromptInputAreaProps) => {
  // Determine if the submit button should be active
  const isPromptEmpty = prompt.trim().length === 0;

  return (
    // 1. Main container: Elevated and slightly inset appearance
    <div className={cn('w-full center flex-col bg-white')}>

      {/* Optional: Descriptive header or context area */}
      <div className="w-full flex justify-between items-center mb-1">
        <Label htmlFor="prompt" className="font-medium text-xs text-neutral-600">
          <Sparkles className="w-3 h-3 inline mr-1" />
          ThinkInk AI Prompt
        </Label>
        {/* Optional quick action for prompt templates */}
        <Button
          variant="ghost"
          type={'button'}
          className="h-6 px-2 text-xs text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
        >
          View Templates
        </Button>
      </div>

      {/* 2. Textarea and Submit Button Container */}
      <div className="w-full flex items-end gap-2">
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your detailed research prompt here... (Shift + Enter for new line)"
          // Key change: Compact appearance with max height, integrated border
          className={cn(
            "w-full h-[160px] resize-none ring-neutral-300 ring-2 text-sm p-3 border-none shadow-inner rounded-lg bg-white",
            "focus:ring-2 focus:ring-neutral-600 focus:outline-none transition-shadow",
            "overflow-y-auto" // Ensure scrollbar appears when limit is hit
          )}
          // Custom logic for submission on Enter (without Shift) would be handled here via onKeyDown
        />
      </div>

      {/* 3. Prompt Refinement/Action Toolbar */}
      <div className="w-full flex justify-end gap-2 mt-2 pt-2 border-t border-black/10">

        {/* Refine Button */}
        <Button
          onClick={onRefineClick}
          type={'button'}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors"
          disabled={isPromptEmpty}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
          Refine Prompt
        </Button>

        {/* View Source/Goal Button */}
        <Button
          type={'button'}
          onClick={onViewSourceClick}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View Goal
        </Button>

        {/* Optional: Settings/Model Select */}
        <Button
          type={'button'}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors"
        >
          <Settings2 className="w-4 h-4" />
        </Button>

        {/* Submit Button */}
        <Button
          type={'submit'}
          disabled={isPromptEmpty}
          className={cn(
            "h-10 w-10 p-0 flex-shrink-0 bg-black text-white hover:bg-neutral-800 transition-colors",
            "disabled:bg-neutral-300 disabled:text-neutral-500"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="my-0.5" />
    </div>
  );
};

// --- RenderReferenceUrl Component (No change, repeated for completeness) ---
const RenderReferenceUrl = ({ setUrl, url, urls, setUrls }: { url: string, setUrl: React.Dispatch<React.SetStateAction<string>>, urls: string[], setUrls: React.Dispatch<React.SetStateAction<string[]>>}) => {

  const handleAdd = () => {
    if (!url.trim()){
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
    setUrls(prev => ([...prev, normalizedUrl]));
    setUrl(''); // Clear input after adding
  }

  const handleRemove = (urlToRemove: string) => {
    setUrls(prev => prev.filter(u => u !== urlToRemove));
  }

  return (
    <div className={'center flex-col gap-3 w-full overflow-x-hidden mb-3 h-fit'}>
      <div className={cn('w-full flex justify-between items-end')}>
        <Label htmlFor="url" className="font-semibold text-xs text-black">Reference URLs</Label>
      </div>

      {/* URL Input with Add Button */}
      <div className="w-full flex gap-2">
        <div className="relative flex-grow">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/60" />
          <Input
            className={cn('text-sm pl-10 border-black/20 focus:border-black')}
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
            placeholder="https://example.com"
          />
        </div>
        <Button
          onClick={handleAdd}
          type={'button'}
          className='bg-black text-white  h-9 px-3 transition-colors'
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div id={'hide-scrollbar'} className="bg-neutral-50 overflow-hidden mt-2 flex-1 center flex-row border border-gray-200 rounded-md p-2 max-h-40">
        <div id={'hide-scrollbar'}  className={cn('!overflow-x-auto rounded-sm px-3  absolute flex-1 gap-2 flex-row flex justify-start w-full')}>
          {urls.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs py-1 px-2 mr-1 rounded-sm bg-neutral-50 hover:bg-neutral-200 transition-colors"
            >
              <LinkIcon className="h-3 w-3 mr-2 text-neutral-500 shrink-0" />
              <span className="truncate flex-grow text-neutral-700">{url?.substring(0, 30)}</span>
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
  )
}

const RenderFileAttachment = ({ attachedFile, handleFileAttach, handleRemoveFile }) => {
  return (
    <div className={'center flex-col gap-2.5 w-full h-fit border-b border-black/10 pb-3'}>
      <div className={cn('w-full between')}>
        <Label className="font-semibold text-xs text-black">Attachment (Image or Document)</Label>

        {attachedFile ? (
          // Display attached file name and remove button
          <Button
            onClick={handleRemoveFile}
            type={'button'}
            variant={'ghost'}
            className='text-xs text-red-600 hover:text-red-700 p-0 h-auto'
          >
            <X className="h-3 w-3 mr-1" /> Remove
          </Button>
        ) : (
          // Display upload button (linked to hidden input)
          <label htmlFor="file-attach-input" className="cursor-pointer text-xs">
            <Button
              asChild
              className='bg-black text-white text-xs hover:bg-neutral-600 h-8 px-3 transition-colors'
            >
              <div className="flex items-center">
                <Paperclip className="h-4 w-4 mr-1" /> Attach
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
          className={cn('w-full flex items-center p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-sm text-black/80')}
        >
          <Paperclip className="h-4 w-4 mr-2 text-black flex-shrink-0" />
          <span className="truncate font-medium">{attachedFile.name}</span>
          <span className="ml-auto text-xs text-black font-bold">
                        {attachedFile.type.split('/')[1] || attachedFile.type}
                    </span>
        </motion.div>
      )}
    </div>
  );
};