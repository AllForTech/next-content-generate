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

export const SystemPromptSelector = ({
  onPromptChange,
}: {
  onPromptChange: (prompt: string) => void;
}) => {
  const { setSelectedPrompt, selectedPrompt } = useContent();
  // Initialize with the first prompt
  const [selectedPromptValue, setSelectedPromptValue] = useState<string>(
    selectedPrompt.fullPromptText,
  );

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
    <div className="container-full center !max-h-[87dvh] flex-col !justify-start gap-2 space-y-1.5 rounded-lg border border-neutral-200 bg-white p-2.5 py-1">
      {/* Header */}
      {/*<div className="flex items-center space-x-2 border-b border-neutral-100 pb-2 mb-2">*/}
      {/*  <BookOpen className="h-5 w-5 text-black" />*/}
      {/*  <h3 className="text-lg font-semibold text-black">Content Strategy</h3>*/}
      {/*</div>*/}

      {/* Prompt Selection List (Flex Column) */}
      <div className={'container-full center overflow-hidden'}>
        <ScrollArea className="flex h-full w-full flex-col space-y-3 rounded-md p-2.5 py-1">
          {predefinedPrompts.map((prompt) => {
            const isSelected = prompt.value === selectedPrompt.value;

            return (
              <div
                key={prompt.value}
                onClick={() => handleSelectPrompt(prompt)}
                // Card Styling and Constraints
                className={`relative mb-2 h-[150px] w-full cursor-pointer rounded-lg p-4 shadow-md transition-all duration-200 ${
                  isSelected
                    ? 'border-2 border-neutral-600 bg-indigo-50 shadow-lg'
                    : 'border border-neutral-200 bg-white hover:border-neutral-400'
                } `}
              >
                {/* Custom Checkbox Cycle (Top-Left) */}
                <div
                  className={`absolute top-3 left-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    isSelected
                      ? 'border-neutral-600 bg-neutral-600 text-white'
                      : 'border-neutral-400 bg-white text-white'
                  } `}
                >
                  {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>

                {/* Card Content */}
                <div className="ml-8 space-y-1">
                  <h4
                    className={`text-md font-bold ${isSelected ? 'text-neutral-800' : 'text-black'}`}
                  >
                    {prompt.label}
                  </h4>
                  <p
                    className={`text-xs leading-relaxed ${isSelected ? 'text-neutral-700' : 'text-neutral-700'}`}
                  >
                    {prompt.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div
                  className={`absolute right-3 bottom-3 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isSelected
                      ? 'bg-neutral-100 text-neutral-600'
                      : 'bg-neutral-100 text-neutral-600'
                  } `}
                >
                  Select to Apply
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {/* Detailed Description Panel */}
      <CustomizablePromptDisplay
        selectedPrompt={selectedPrompt}
        onCustomPromptChange={onPromptChange}
      />
    </div>
  );
};
