'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation'
import {createClient} from "@/utils/supabase/client";

export type ChatHistoryType = {
  id: string;
  role: 'user' | 'agent',
  content: string | null,
}

export type PanelTabsStateType = 'prompt' | 'history' | 'source' | 'management'

export type ContentSources = { snippet: string, url: string }

export type ScrapedDataType = { url: string, content: string }

export type UnsplashImagesType = { url: string, alt_description: string, photographer: string }

export const panelTabsState = {
  prompt: 'prompt',
  history: 'history',
  source: 'source',
  management: 'management'
}

// --- 1. Define the Context Interface (What components can access) ---
interface GenerationContextType {
    // The final structured output from the AI
    generatedContent: string | null;
  setGeneratedContent: (content: string) => void;

    // State variables
    isLoading: boolean;
    error: string | null;

    // Actions
    generateContent: (prompt: string, contentType: string, tags: string[], tone: string, url: string[]) => Promise<void>;
    clearContent: () => void;

    chatHistory: ChatHistoryType[];

    replaceCurrentContent: (history: ChatHistoryType) => void;

    handleSelection: (type: string) => void;
    handleDocxExport: (markdownContent: string) => void;

    panelTabs: PanelTabsStateType;
    setPanelTabs: (panelTabs: PanelTabsStateType) => void;

    contentSources: ContentSources[],
    setContentSources: (contentSources: ContentSources[]) => void,
    unsplashImages: any[],
    setUnsplashImages: (unsplashImages: any[]) => void,
    scrapedData: ScrapedDataType[],
    setScrapedData: (scrapedData: ScrapedDataType) => void,
}

// --- 2. Create the Context with Default Values ---
const GenerationContext = createContext<GenerationContextType | undefined>(
    undefined
);

// --- 3. Create the Provider Component ---
export function ContextProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { content_id } = useParams();

    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [panelTabs, setPanelTabs] = useState<PanelTabsStateType>('prompt');
    const [contentSources, setContentSources] = useState<ContentSources[]>([]);
    const [unsplashImages, setUnsplashImages] = useState<UnsplashImagesType[]>([]);
    const [scrapedData, setScrapedData] = useState<ScrapedDataType[]>([]);


    // The function to call the Next.js API Route
  const generateContent = async (prompt: string, contentType: string, tags: string[], tone: string, url: string[]) => {
      if (!prompt || !contentType || !content_id) {
        return;
      }
      const id = nanoid()
      setIsLoading(true);
      setGeneratedContent('');
      setChatHistory(prev => ([...prev, { id, role: 'user', content: prompt }]))

      try {
        const response = await fetch(`/api/generate/${content_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt, contentType, tags, tone, url })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.error || 'Failed to generate content due to server error.');
        }

        const newId = nanoid();
        const resultData = await response.json();

        setGeneratedContent(resultData.mainContent);
        setContentSources(resultData.searchResults);
        setUnsplashImages(resultData.unsplashImages);
        setScrapedData(resultData.scrapedDtate);

        setChatHistory(prev => ([...prev, { id: newId, role: 'agent', content: resultData.mainContent }]))

      } catch (error) {
        console.error(error);
        setError(error.message);
        toast.error(<p className={'text-xs text-red-400 font-medium'}>{error?.message ?? 'Error connecting to Ai model'}</p>)
      } finally {
        setIsLoading(false);
      }
  };

    const replaceCurrentContent = (history: ChatHistoryType) => {
      if (!history || !chatHistory) return;
      if (history.role !== 'agent') return;

      const selectedMessage = chatHistory.find((hstry) => hstry.id.trim() === history?.id?.trim());

      if (!selectedMessage) return;

      setGeneratedContent(selectedMessage.content);
    }

    // Simple function to reset the state
    const clearContent = useCallback(() => {
        setGeneratedContent(null);
        setError(null);
    }, []);

    const handleSelection = async (type: string) => {
        const newId = nanoid();
        const supabase = createClient();

        const user = await supabase.auth.getUser();

        console.log(user.data.user)

        const { error, data } = await supabase.from('contents').insert({
            content: '# start tour new document',
            type,
            author_id: user.data.user?.id,
            contentId: newId,
            tags: []
        }).select('*')

        if (error) console.log(error);

        console.log(data)
        setGeneratedContent(data[0]?.content);

        router.push(`/dashboard/generate/${data[0]?.type}/${data[0]?.contentId}`);
    }

  // Example Client-Side Function (e.g., in a React Component)

  async function handleDocxExport(markdownContent: string) {
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markdown: markdownContent,
        filename: 'Web_Content_Architect_Report' // Customize the name
      }),
    });

    if (!response.ok) {
      console.error('Export failed:', await response.json());
      return;
    }

    // 1. Get the binary data (Blob) from the response
    const blob = await response.blob();

    // 2. Extract the filename from the Content-Disposition header (optional but good practice)
    const contentDisposition = response.headers.get('Content-Disposition');
    const defaultFilename = 'document.docx';
    let filename = defaultFilename;

    if (contentDisposition) {
      // Basic regex to extract filename="X.docx"
      const matches = contentDisposition.match(/filename="(.+)"/);
      if (matches && matches[1]) {
        filename = matches[1];
      }
    }

    // 3. Create a temporary link element to trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up the object URL
  }

    const value = {
        generatedContent,
        isLoading,
        error,
        generateContent,
        clearContent,
        chatHistory,
        replaceCurrentContent,
        handleSelection,
        handleDocxExport,
        setGeneratedContent,
        panelTabs,
        setPanelTabs,
        contentSources,
        setContentSources,
        unsplashImages,
        setUnsplashImages,
        scrapedData,
        setScrapedData,
    };

    return (
        <GenerationContext.Provider value={value}>
            {children}
        </GenerationContext.Provider>
    );
}

// --- 4. Custom Hook for Consumption ---
export function useContent() {
    const context = useContext(GenerationContext);
    if (context === undefined) {
        throw new Error('useGeneration must be used within a GenerationProvider');
    }
    return context;
}
