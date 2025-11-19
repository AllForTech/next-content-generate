'use client'

import React, { useCallback, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { panelTabsState, PanelTabsStateType, useContent } from '@/context/GenerationContext';
import { cn, extractMarkdownImageUrls } from '@/lib/utils';
import { PromptProps } from '@/components/Layout/Dashboard/Generate/Prompt';
import Prompt from '@/components/Layout/Dashboard/Generate/Prompt';
import { ChatHistoryRenderer } from '@/components/Layout/Dashboard/Generate/ChatHistoryRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Button } from '@mdxeditor/editor';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import MobileSheetWrapper from '@/components/Layout/Dashboard/Generate/MobileSheetWrapper';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

export const RightSidebarPanel = ({ contentId, onGenerate } :PromptProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // The actual Tabs content block, which remains unchanged
  const SidebarContent = (
    <Tabs defaultValue={panelTabsState.prompt} className={'container-full p-1.5 center flex-col gap-2'}>
      <PanelTabs/>
      <div className={cn('center container-full')}>
        <TabsContent className={'container-full'} value={panelTabsState.prompt}>
          <Prompt contentType={''} onGenerate={onGenerate} contentId={contentId} />
        </TabsContent>
        <TabsContent className={'container-full'} value={panelTabsState.history}>
          <History/>
        </TabsContent>
        <TabsContent className={'container-full'} value={panelTabsState.images}>
          <Images/>
        </TabsContent>
        {/*<TabsContent className={'container-full'} value={panelTabsState.management}>*/}
        {/* <Management/>*/}
        {/*</TabsContent>*/}
      </div>
    </Tabs>
  );

  return (
    <MobileSheetWrapper
      isMobile={isMobile}
      isOpen={isSheetOpen}
      setIsOpen={setIsSheetOpen}
    >
      {SidebarContent}
    </MobileSheetWrapper>
  );
};

const PanelTabs = () => {

  return (
    <div className={'w-full h-fit flex-col gap-2.5 center'}>
      <TabsList className={cn('w-full bg-stone-200 center gap-2')}>
        {Object.values(panelTabsState).map((tab: PanelTabsStateType) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn('text-xs font-semibold data-[state=active]:bg-black data-[state=active]:text-white transition-300',
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}

const History = () => {

  return (
    <div className={cn('container-full !w-[400px] center flex-col gap-2')}>
      <ChatHistoryRenderer/>
    </div>
  )
}

export const Source = () => {
  const { contentSources } = useContent();


  return (
    <ScrollArea className={cn('center container-full absolute inset-0 flex-col gap-2.5 bg-white p-4')}>
      <h3 className="text-lg font-bold text-black mb-3 border-b border-black/10 w-full pb-2">
        Content Sources & Snippets
      </h3>
      {/* Refactored source snippet style for black/white theme */}
      {contentSources && contentSources?.map((source: any, index) => (
        <div key={index} className={cn('w-full h-fit p-4 text-black text-xs gap-3 mb-2.5 overflow-hidden bg-white border border-black/20 rounded-md shadow-sm')}>
          <p className="font-semibold text-sm mb-1">{source?.source?.substring(0, 70)}...</p>
          {/*<p className="text-black/90 text-xs text-wrap font-medium italic">{source?.snippet}</p>*/}
        </div>
      ))}
      {contentSources?.length === 0 && (
        <div className="text-center p-6 text-black/70">
          No sources found.
        </div>
      )}
    </ScrollArea>
  )
}


const Images = () => {
  const { generatedContent, localImages, setLocalImages } = useContent();

  // MAINTAINED LOGIC: Extract images from Markdown
  const extractedUrls = useMemo(() => {
    return extractMarkdownImageUrls(generatedContent);
  }, [generatedContent]);

  const handleInsertImage = (url) => {
    console.log("Image selected for insertion:", url);
    toast.success("Image URL copied and ready for editor insertion.", {
      description: url.length > 50 ? url.substring(0, 47) + '...' : url
    });
  };
  
  // COMBINED LIST: Merge local and extracted images
  const allImageUrls = useMemo(() => {
    if (!localImages){
      return Array.from(extractedUrls);
    }
    // Use a Set to ensure uniqueness, prioritizing local over extracted if URLs overlap
    return Array.from(new Set([...localImages, ...extractedUrls]));
  }, [localImages, extractedUrls]);

  // MAINTAINED LOGIC: Handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setLocalImages(prev => [base64Url, ...prev]);
        toast.success("Image uploaded locally.");
        event.target.value = null; // Reset file input
      };
      reader.readAsDataURL(file);
    }
  }, [setLocalImages]);

  // MAINTAINED LOGIC: Handler to remove a local image
  const handleRemoveLocalImage = useCallback((urlToRemove: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setLocalImages((image: any[]) => image.filter(url => url !== urlToRemove));
  }, [setLocalImages]);


  // MAINTAINED LOGIC: Check if the URL came from local upload
  const isLocalImage = (url) => url.startsWith('data:image/');

  const hasImages = allImageUrls.length > 0;

  return (
    <ScrollArea className={cn('center container-full max-h-[82dvh] flex-col gap-2.5 !w-[400px] bg-white h-full p-4')}>
      <h3 className="text-lg font-bold text-black mb-3 border-b border-black/10 w-full pb-2">
        Images
      </h3>

      {hasImages ? (
        <div className="grid grid-cols-2 gap-3 w-full">
          {allImageUrls && allImageUrls.map((url: string, index: number) => (
            <motion.div
              key={url?.substring(0, 50) + index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden rounded-md border border-black/10 shadow-sm group"
            >
              {/* Image Preview Container */}
              <div
                className="w-full h-full bg-black/10 flex items-center justify-center text-xs text-black/50 bg-cover bg-center transition-all duration-300 group-hover:scale-[1.05]"
                style={{ backgroundImage: `url(${url})` }}
              >
                {/* Label for Local/Extracted */}
                <span className={cn(
                  "p-1 rounded text-[10px] font-semibold absolute top-2 right-2",
                  isLocalImage(url) ? "bg-black text-white" : "bg-white text-black border border-black/20"
                )}>
                      {isLocalImage(url) ? "LOCAL" : "EXTRACTED"}
                  </span>
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end items-center p-2 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                {/* Insert Button (Primary Action) */}
                <div
                  onClick={() => handleInsertImage(url)}
                  className="w-full mb-1 bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                >
                  Insert into Editor
                </div>

                {/* Remove Button (Only for locally uploaded images) */}
                {isLocalImage(url) && (
                  <div
                    onClick={() => handleRemoveLocalImage(url)}
                    className="w-full bg-white text-black border border-black/20 text-xs font-semibold hover:bg-black hover:text-white"
                  >
                    <X className="h-3 w-3 mr-1" /> Remove
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 text-black/70 border border-black/10 rounded-lg w-full">
          No images found. Upload one or generate content to see suggestions.
        </div>
      )}

      {/* Upload Block (Creative Redesign of the original h2/p div) */}
      <div className={cn('w-full between mt-3.5 mb-4')}>
        <label htmlFor="local-image-upload" className="cursor-pointer w-full">
          <div className='w-full h-[60px] flex items-center justify-between p-3 rounded-lg border border-black/10 hover:bg-stone-200  transition-colors bg-white shadow-sm'>
            <h2 className={cn('text-sm font-semibold text-black flex items-center')}>
              <Upload className="h-4 w-4 mr-2 text-black/80" />
              Upload Local Image
            </h2>
            <div
              className={'bg-black text-white hover:bg-stone-600 center rounded-md h-8 px-3 transition-colors'}
            >
              <div className="flex items-center">
                <span className="text-xl leading-none">+</span>
              </div>
            </div>
            {/* Hidden file input, linked via 'htmlFor' */}
            <input
              id="local-image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </label>
      </div>

    </ScrollArea>
  );
};

const Management = () => {
  // State for the API Key input
  const [apiKey, setApiKey] = useState('');
  // State for temporary save status message
  const [saveStatus, setSaveStatus] = useState('');

  // Handler for saving the API key (simulated)
  const handleSave = useCallback(() => {
    if (apiKey.trim() === '') {
      setSaveStatus('API Key cannot be empty.');
      return;
    }

    // In a real application, you would save this to a database or configuration file.
    // console.log("Saving API Key:", apiKey.trim());

    setSaveStatus('Settings saved successfully!');

    // Clear status after a short period
    setTimeout(() => setSaveStatus(''), 3000);
  }, [apiKey]);

  return (
    <ScrollArea className="h-full bg-white text-black shadow-2xl transition-transform duration-300 ease-in-out z-40
                  w-full max-w-[400px]
                  md:translate-x-0
                  p-6 sm:p-8
                  max-h-[82dvh]
                  border-l border-black/20"
    >
      {/* Sidebar Header */}
      <h1 className="text-3xl font-extrabold mb-8 border-b pb-4 border-black/30">
        Management Settings
      </h1>

      {/* API Key Management Section */}
      <section className="mb-8 p-4 border border-black/30 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          External API Key
        </h2>

        <p className="text-sm mb-4 text-black/70">
          Enter your custom AI provider API key to lift usage restrictions.
        </p>

        {/* Input Group */}
        <div className="flex flex-col space-y-3">
          <label htmlFor="apiKey" className="text-sm font-medium">
            API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full p-3 text-xs border border-black/50 rounded-md
                       focus:ring-1 focus:ring-black/80 focus:border-black transition duration-150
                       text-black placeholder-black/50 outline-none"
            aria-label="API Key input field"
          />

          {/* Status and Save Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-2  text-xs bg-black text-white font-semibold rounded-lg
                         hover:bg-gray-800 transition duration-150 shadow-sm
                         focus:outline-none focus:ring-4 focus:ring-black/50 active:bg-gray-900"
            >
              Save Key
            </button>

            {saveStatus && (
              <p className={`text-sm font-medium transition-opacity ${saveStatus.includes('saved') ? 'text-black' : 'text-gray-600'} opacity-100`}>
                {saveStatus}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Additional Settings (Placeholder) */}
      <section className="mb-8 p-4 border border-black/30 rounded-lg opacity-70">
        <h2 className="text-xl font-bold mb-4">
          Future Settings
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-1 border-b border-black/10">
            <span>Toggle Feature X</span>
            <div className="w-10 h-6 bg-gray-200 rounded-full"></div> {/* Placeholder switch */}
          </div>
          <div className="flex items-center justify-between py-1">
            <span>Max Tokens Limit</span>
            <input type="number" defaultValue="2048" className="w-20 p-1 border border-black/50 rounded-md text-center" />
          </div>
        </div>
        <p className="text-xs mt-3 italic text-black/50">
          These settings are currently read-only placeholders.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-xs text-center text-black/50 mt-10 pt-4 border-t border-black/10">
        <p>&copy; 2025 Application Management</p>
      </footer>
    </ScrollArea>
  );
};