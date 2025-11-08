'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from 'react';
import { nanoid } from 'nanoid';


// --- 1. Define the Context Interface (What components can access) ---
interface GlobalStateContextType {
    createContentDialogOpen: boolean;
    setCreateContentDialogOpen: (prev: boolean) => void;
    selectedContentType: any;
    setSelectedContentType: any;
}

// --- 2. Create the Context with Default Values ---
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
    undefined
);

export const contentType = {
  blog: 'blog',
  social: 'social',
  document: 'document',
}

// --- 3. Create the Provider Component ---
export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [createContentDialogOpen, setCreateContentDialogOpen] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState({});
    


    const value = {
        createContentDialogOpen,
        setCreateContentDialogOpen,
        selectedContentType,
        setSelectedContentType,
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
}

// --- 4. Custom Hook for Consumption ---
export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}