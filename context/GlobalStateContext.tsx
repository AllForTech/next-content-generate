'use client';

import {
    createContext,
    useContext,
    useState,
    ReactNode
} from 'react';

export const contentTypes = {
  blog: 'blog',
  social: 'social',
  document: 'document',
} as const;

export type ContentType = typeof contentTypes[keyof typeof contentTypes];

// --- 1. Define the Context Interface (What components can access) ---
interface GlobalStateContextType {
    createContentDialogOpen: boolean;
    setCreateContentDialogOpen: (prev: boolean) => void;
    selectedContentType: ContentType | null;
    setSelectedContentType: (type: ContentType | null) => void;
    isEditingRaw: boolean;
    setIsEditingRaw: any;
    handleToggleEdit: () => void;
}

// --- 2. Create the Context with Default Values ---
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
    undefined
);

// --- 3. Create the Provider Component ---
export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [createContentDialogOpen, setCreateContentDialogOpen] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null);
    const [isEditingRaw, setIsEditingRaw] = useState(false);


    const handleToggleEdit = () => {
        setIsEditingRaw(prev => !prev);
    };
    
    const value = {
        createContentDialogOpen,
        setCreateContentDialogOpen,
        selectedContentType,
        setSelectedContentType,
        isEditingRaw,
        setIsEditingRaw,
        handleToggleEdit,
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