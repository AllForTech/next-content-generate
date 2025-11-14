'use client';
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Link as LinkIcon, Plus } from 'lucide-react';
import { useContent } from "@/context/GenerationContext";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Removed NativeSelect import as it is being replaced
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export type PromptProps = {
  onGenerate: (prompt: string, contentType: string, tags: string[], tone: string, urls: string[]) => void;
  contentType: string;
  contentId: string;
}

const tones = ["Professional", "Casual", "Witty", "Sarcastic", "Formal"];

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
            'text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 border',
            // Active State: Black background, White text, Indigo ring
            t === selectedTone
              ? 'bg-black text-white border-black ring-2  shadow-md'
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

const Prompt = ({ onGenerate, contentType, contentId }: PromptProps) => {
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [tone, setTone] = useState('Professional');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);

  const { isLoading } = useContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    onGenerate(prompt, contentType, tagsArray, tone, urls);
  };

  return (
    // Enhanced Floating Card Style
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'w-[400px] h-full p-4 rounded-2xl flex flex-col',
        'bg-white/95 backdrop-blur-sm border border-black/5',
        'shadow-xl shadow-black/10 transition-shadow duration-300' // Subtle floating shadow
      )}
    >
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-4">

        {/* Tags Input Field */}
        <div className="w-full flex flex-col gap-2.5">
          <Label htmlFor="tags" className="font-semibold text-black">Tags (comma-separated)</Label>
          <Input id="tags" value={tags} className={'text-sm border-black/20 focus:border-black'} onChange={(e) => setTags(e.target.value)} placeholder="e.g., AI, Tech, Innovation" />
        </div>

        {/* TONE SELECTOR (Replaced NativeSelect) */}
        <div className="w-full flex flex-col gap-2.5">
          <Label className="font-semibold text-black">Tone</Label>
          <ToneSelector selectedTone={tone} setTone={setTone} />
        </div>

        {/* RenderReferenceUrl Component */}
        <div className="w-full flex flex-col gap-2.5">
          <RenderReferenceUrl url={url} setUrl={setUrl} urls={urls} setUrls={setUrls}/>
        </div>

        {/* Prompt Textarea */}
        <div className="flex-grow flex flex-col min-h-[150px]">
          <Label htmlFor="prompt" className="font-semibold text-black mb-2">Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your detailed prompt here..."
            // Monochrome style: White background, subtle black border
            className={cn("w-full h-full resize-none text-sm p-3 border border-black/20 rounded-lg bg-white focus:border-indigo-600 transition-colors")}
          />
        </div>

        {/* CTA Button (Black/Indigo Theme) */}
        <Button
          disabled={isLoading}
          type={'submit'}
          className="w-full bg-black text-white hover:bg-indigo-600 transition-colors duration-300 font-bold text-base shadow-lg shadow-black/20 disabled:bg-black/50"
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </Button>
      </form>
    </motion.div>
  );
};

export default Prompt;

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
    <div className={'center flex-col gap-3 w-full h-fit'}>
      <div className={cn('w-full flex justify-between items-end')}>
        <Label htmlFor="url" className="font-semibold text-black">Reference URLs</Label>
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

      {/* URL Tags (Creative Styling) */}
      <div className={cn('w-full max-h-[100px] overflow-y-auto pt-1 flex flex-wrap gap-2')}>
        {urls && urls.map(u => (
          <motion.div
            key={u}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn('flex items-center text-xs h-fit p-1.5 rounded-full bg-black text-white cursor-pointer hover:opacity-80 transition-opacity')}
            onClick={() => handleRemove(u)}
          >
            <span className="max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis pr-1 font-medium">
              {u.replace(/https?:\/\//, '').substring(0, 20)}...
            </span>
            <X className="h-3 w-3 ml-0.5 text-white/80" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}