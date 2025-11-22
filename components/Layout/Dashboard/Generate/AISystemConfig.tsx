'use client';

import React, { useState } from 'react';
import { BookOpen, Check, Lightbulb } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { predefinedPrompts } from '@/lib/AI/ai.system.prompt';
import { useContent } from '@/context/GenerationContext';
import { CustomizablePromptDisplay } from '@/components/Layout/Dashboard/CustomizePrompt';

export interface SystemPromptOption {
  value: string; // Internal identifier
  label: string; // Display name
  description: string; // Explains the prompt's role
  fullPromptText: string; // The actual text sent to the AI
}

// -------------------------------------------------------------

export const SystemPromptSelector = ({ onPromptChange }: { onPromptChange: (prompt: string) => void }) => {
  // Initialize with the first prompt
  const [selectedPromptValue, setSelectedPromptValue] = useState<string>(predefinedPrompts[0].value);
  
  const { setSelectedPrompt, selectedPrompt } = useContent();


  const handleSelectPrompt = (prompt: SystemPromptOption) => {
    setSelectedPromptValue(prompt.value);
    setSelectedPrompt(prompt);
    // Pass the *full text* of the system prompt back to the parent form/state
    onPromptChange(prompt.fullPromptText);
  };

  // Call the initial change handler to set the default value on mount
  React.useEffect(() => {
    onPromptChange(predefinedPrompts[0].fullPromptText);
  }, [onPromptChange]); // Dependency on onPromptChange for ESLint, but runs once

  return (
    <div className="p-2.5 py-1 bg-white container-full !max-h-[87dvh] center !justify-start flex-col gap-2 rounded-lg border border-neutral-200 space-y-1.5">

      {/* Header */}
      {/*<div className="flex items-center space-x-2 border-b border-neutral-100 pb-2 mb-2">*/}
      {/*  <BookOpen className="h-5 w-5 text-black" />*/}
      {/*  <h3 className="text-lg font-semibold text-black">Content Strategy</h3>*/}
      {/*</div>*/}

      {/* Prompt Selection List (Flex Column) */}
      <div className={'container-full center overflow-hidden'}>
        <ScrollArea className="flex flex-col w-full rounded-md h-full p-2.5 py-1 space-y-3">
          {predefinedPrompts.map((prompt) => {
            const isSelected = prompt.value === selectedPromptValue;

            return (
              <div
                key={prompt.value}
                onClick={() => handleSelectPrompt(prompt)}
                // Card Styling and Constraints
                className={`
                relative w-full h-[150px] p-4 mb-2 rounded-lg cursor-pointer transition-all duration-200 
                shadow-md
                ${isSelected
                  ? 'bg-indigo-50 border-2 border-neutral-600 shadow-lg'
                  : 'bg-white border border-neutral-200 hover:border-neutral-400'
                }
              `}
              >
                {/* Custom Checkbox Cycle (Top-Left) */}
                <div
                  className={`
                  absolute top-3 left-3 w-5 h-5 rounded-full border-2 
                  flex items-center justify-center transition-colors duration-200
                  ${isSelected
                    ? 'bg-neutral-600 border-neutral-600 text-white'
                    : 'bg-white border-neutral-400 text-white'
                  }
                `}
                >
                  {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                </div>

                {/* Card Content */}
                <div className="ml-8 space-y-1">
                  <h4 className={`text-md font-bold ${isSelected ? 'text-neutral-800' : 'text-black'}`}>
                    {prompt.label}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-neutral-700' : 'text-neutral-700'}`}>
                    {prompt.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className={`
                absolute bottom-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full
                ${isSelected
                  ? 'bg-neutral-100 text-neutral-600'
                  : 'bg-neutral-100 text-neutral-600'
                }
              `}>
                  Select to Apply
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {/* Detailed Description Panel */}
      <CustomizablePromptDisplay selectedPrompt={selectedPrompt} onCustomPromptChange={onPromptChange}/>
    </div>
  );
};