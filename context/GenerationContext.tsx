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
import { useRouter } from 'next/navigation'
import {createClient} from "@/utils/supabase/client";

export type ChatHistoryType = {
  id: string;
  role: 'user' | 'agent',
  content: string | null,
}

// --- 1. Define the Context Interface (What components can access) ---
interface GenerationContextType {
    // The final structured output from the AI
    generatedContent: string | null;

    // State variables
    isLoading: boolean;
    error: string | null;

    // Actions
    generateContent: (prompt: string, contentType: string, tags: string[], tone: string, url: string[]) => Promise<void>;
    clearContent: () => void;

    chatHistory: ChatHistoryType[];

    replaceCurrentContent: (history: ChatHistoryType) => void;

    handleSelection: (type: string) => void;
}

// --- 2. Create the Context with Default Values ---
const GenerationContext = createContext<GenerationContextType | undefined>(
    undefined
);

// --- 3. Create the Provider Component ---
export function ContextProvider({ children }: { children: ReactNode }) {
    const router = useRouter();

    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);
    const [error, setError] = useState<string | null>(null);


    // The function to call the Next.js API Route
  const generateContent = async (prompt: string, contentType: string, tags: string[], tone: string, url: string[]) => {
      if (!prompt || !contentType) {
        return;
      }
      const id = nanoid()
      setIsLoading(true);
      setGeneratedContent('');
      setChatHistory(prev => ([...prev, { id: 'user', role: 'user', content: prompt }]))
      let content = '';
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt, contentType, tags, tone, url })
        });

        if (!response.body) {
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        const newId = nanoid()

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          const chunkValue = decoder.decode(value);
          content += chunkValue;
          setGeneratedContent((prev) => prev + chunkValue);
        }

        setChatHistory(prev => ([...prev, { id: newId, role: 'agent', content }]))

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

    const value = {
        generatedContent,
        isLoading,
        error,
        generateContent,
        clearContent,
        chatHistory,
        replaceCurrentContent,
        handleSelection,
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
