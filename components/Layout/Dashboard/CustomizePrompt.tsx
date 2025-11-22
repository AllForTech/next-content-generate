'use client';

import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { SystemPromptOption } from '@/components/Layout/Dashboard/Generate/AISystemConfig';

interface CustomizablePromptDisplayProps {
  selectedPrompt: SystemPromptOption;
  // New prop: Function to handle when the user customizes the prompt text
  onCustomPromptChange: (newPromptText: string) => void;
}


export const CustomizablePromptDisplay = ({ selectedPrompt, onCustomPromptChange }: CustomizablePromptDisplayProps) => {
  // State to manage whether the customization panel is open
  const [isExpanded, setIsExpanded] = useState(false);

  // State to hold the current prompt text being displayed/edited
  const [customText, setCustomText] = useState(selectedPrompt.fullPromptText);

  React.useEffect(() => {
    setCustomText(selectedPrompt.fullPromptText);
  }, [selectedPrompt]);

  // Icon to show based on expansion state
  const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

  // Handle changes to the textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setCustomText(newText);
    onCustomPromptChange(newText); // Immediately pass the customized text to the parent
  };

  return (
    <div className="pt-4 border-t w-full border-neutral-200">

      {/* Clickable Header for Expand/Collapse */}
      <div
        className="flex justify-between items-center p-3 bg-neutral-100 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-neutral-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2 text-black text-sm font-semibold">
          <Lightbulb className="h-4 w-4 text-neutral-600" />
          <span>Customize System Prompt</span>
        </div>
        <ChevronIcon className={`h-4 w-4 text-neutral-600 transition-transform duration-300`} />
      </div>

      {/* Customizable Text Area (Conditional Display) */}
      {isExpanded && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-neutral-600">
            Edit the AI&#39;s core instruction below. Changes are applied immediately.
          </p>
          <textarea
            value={customText}
            onChange={handleTextareaChange}
            rows={8}
            className="w-full text-xs text-neutral-800 bg-white p-3 rounded-md border border-neutral-300 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 resize-y transition-shadow shadow-inner"
            placeholder="Enter your custom system prompt here..."
          />
        </div>
      )}
    </div>
  );
};