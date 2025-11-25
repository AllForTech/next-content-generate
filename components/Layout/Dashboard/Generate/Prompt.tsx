'use client';
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Link as LinkIcon, Plus, Paperclip } from 'lucide-react';
import { useContent } from "@/context/GenerationContext";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Removed NativeSelect import as it is being replaced
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [tone, setTone] = useState('Professional');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);

  const { isLoading } = useContent();

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
    <ScrollArea className={cn('center !justify-start flex-col w-full  max-h-full')}>
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
        <form onSubmit={handleSubmit} className="flex-1 between flex-col gap-4">

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

          <div className={cn('w-full h-fit center flex-col gap-2.5')}>
            {/* Prompt Textarea */}
            <div className="w-full flex flex-col h-fit">
              <Label htmlFor="prompt" className="font-semibold text-xs text-black mb-2">Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your detailed prompt here..."
                // Monochrome style: White background, subtle black border
                className={cn("w-full h-[170px] resize-none text-sm p-3 border border-black/20 rounded-lg bg-white focus:border-neutral-600 transition-colors")}
              />
            </div>

            {/* CTA Button (Black/Indigo Theme) */}
            <Button
              disabled={isLoading}
              type={'submit'}
              className="w-full bg-black text-white hover:bg-stone-700 transition-colors duration-300 font-bold text-base shadow-lg shadow-black/20 disabled:bg-black/50"
            >
              {isLoading ? 'Generating...' : 'Generate Content'}
            </Button>
          </div>
        </form>
      </motion.div>
    </ScrollArea>
    // Enhanced Floating Card Style
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

      {/* URL Tags (Creative Styling) */}
      <div className={cn('w-full max-h-[100px] overflow-y-auto pt-1 grid grid-cols-2 gap-2')}>
        {urls && urls.map(u => (
          <motion.div
            key={u}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn('flex items-center justify-start text-xs h-fit p-1.5 py-0.5 rounded-full bg-black text-white cursor-pointer hover:opacity-80 transition-opacity')}
            onClick={() => handleRemove(u)}
          >
            <span className="max-w-[120px] center overflow-hidden  whitespace-nowrap text-ellipsis pr-1 font-medium">
              {u.replace(/https?:\/\//, '').substring(0, 15)}...
            </span>
            <X className="h-3 w-3 ml-0.5 text-white/80" />
          </motion.div>
        ))}
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
              className='bg-black text-white hover:bg-indigo-600 h-8 px-3 transition-colors'
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
          <Paperclip className="h-4 w-4 mr-2 text-indigo-600 flex-shrink-0" />
          <span className="truncate font-medium">{attachedFile.name}</span>
          <span className="ml-auto text-xs text-indigo-600 font-bold">
                        {attachedFile.type.split('/')[1] || attachedFile.type}
                    </span>
        </motion.div>
      )}
    </div>
  );
};