'use client';
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatHistoryRenderer } from '@/components/Layout/Dashboard/Generate/ChatHistoryRenderer';
import {useContent} from "@/context/GenerationContext";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { toast } from 'sonner';

export type PromptProps = {
    onGenerate: (prompt: string, contentType: string, tags: string[], tone: string, urls: string[]) => void;
    contentType: string;
    contentId: string;
}

const tones = ["Professional", "Casual", "Witty", "Sarcastic", "Formal"];

const Prompt = ({ onGenerate, contentType, contentId }) => {
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
        <div className={cn('w-[400px] bg-white shadow-xl drop-shadow-md shadow-stone-300 rounded-2xl transition-300 !h-full p-[7px] center flex-col',
        )}>

            <form onSubmit={handleSubmit} className={cn('center w-full h-full  transition-300 rounded-md bg-transparent  p-1.5 flex flex-col gap-4',
              )}>
                <div className="w-full flex flex-col gap-2.5">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" value={tags} className={'text-xs !ring-0 outline-0 shadow-none'} onChange={(e) => setTags(e.target.value)} placeholder="e.g., AI, Tech, Innovation" />
                </div>
                <div className="w-full flex flex-col gap-2.5">
                    <Label htmlFor="tone">Tone</Label>
                    <NativeSelect id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                        {tones.map(t => <option key={t} value={t}>{t}</option>)}
                    </NativeSelect>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                   <RenderReferenceUrl url={url} setUrl={setUrl} urls={urls} setUrls={setUrls}/>
                </div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className={cn("w-full h-full resize-none text-xs !ring-0 outline-0 shadow-none bg-stone-200 border-none outline-none shadow-none")}
              />
                <Button
                    disabled={isLoading}
                    type={'submit'}
                    className="w-full">
                    Generate
                </Button>
            </form>
        </div>
    );
};

export default Prompt;

const RenderReferenceUrl = ({ setUrl, url, urls, setUrls }: { url: string, setUrl: React.Dispatch<React.SetStateAction<string>>, urls: string[], setUrls: React.Dispatch<React.SetStateAction<string[]>>}) => {

  const handleAdd = () => {
    if (!urls || !url){
      return
    }
    const exists = urls?.includes(url);
    if (exists) {
      toast.message('Url already added!');
      return;
    }
    setUrls(prev => ([...prev, url]));
  }

  return (
    <div className={'center flex-col gap-2.5 w-full h-fit'}>
      <div className={cn('w-full between')}>
        <Label htmlFor="url">Reference URL</Label>
        <Button
          onClick={handleAdd}
          type={'button'}
        >add</Button>
      </div>
      <Input className={cn('text-xs !ring-0 outline-0 shadow-none')} id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
      <div className={cn('w-full h-fit grid grid-cols-3 flex-col gap-2')}>
        {urls && urls.map(u => (
          <div
            key={u}
            className={cn('text-xs w-full h-fit overflow-hidden text-nowrap p-2 rounded-sm bg-stone-500 text-white/90')}>
            {u}
          </div>
        ))}
      </div>
    </div>
  )
}