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
    generateContent: (prompt: string) => Promise<void>;
    clearContent: () => void;

    chatHistory: ChatHistoryType[];

    replaceCurrentContent: (history: ChatHistoryType) => void;
}

// --- 2. Create the Context with Default Values ---
const GenerationContext = createContext<GenerationContextType | undefined>(
    undefined
);

// --- 3. Create the Provider Component ---
export function ContextProvider({ children }: { children: ReactNode }) {
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);
    const [error, setError] = useState<string | null>(null);


    // The function to call the Next.js API Route
  const generateContent = async (prompt: string) => {
      if (!prompt) {
        return;
      }
      const id = nanoid()
      setIsLoading(true);
      setGeneratedContent('');
      setChatHistory(prev => ([...prev, { id, role: 'user', content: prompt }]))
      let content = '';
      try {
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
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

    const value = {
        generatedContent,
        isLoading,
        error,
        generateContent,
        clearContent,
        chatHistory,
        replaceCurrentContent,
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