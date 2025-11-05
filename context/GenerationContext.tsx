'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from 'react';
import { ContentGenerationResponse } from '@/lib/schema';

// --- 1. Define the Context Interface (What components can access) ---
interface GenerationContextType {
    // The final structured output from the AI
    generatedContent: ContentGenerationResponse | null;

    // State variables
    isLoading: boolean;
    error: string | null;

    // Actions
    generateContent: (prompt: string, contentType: string) => Promise<void>;
    clearContent: () => void;
}

// --- 2. Create the Context with Default Values ---
const GenerationContext = createContext<GenerationContextType | undefined>(
    undefined
);

// --- 3. Create the Provider Component ---
export function GenerationProvider({ children }: { children: ReactNode }) {
    const [generatedContent, setGeneratedContent] = useState<ContentGenerationResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // The function to call the Next.js API Route
    const generateContent = useCallback(async (prompt: string, contentType: string) => {
        setIsLoading(true);
        setError(null);
        setGeneratedContent(null); // Clear previous content

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, contentType }),
            });

            if (!response.ok) {
                // If the API route returns a status error (e.g., 400 or 500)
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate content from API.');
            }

            // The response is already the structured JSON object, guaranteed by Zod in the API.
            const data: ContentGenerationResponse = await response.json();

            setGeneratedContent(data);

        } catch (err) {
            console.error("Content generation failed:", err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

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