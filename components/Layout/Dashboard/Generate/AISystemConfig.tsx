'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookOpen, Lightbulb } from 'lucide-react';

// 🛑 Define the shape of a System Prompt option
interface SystemPromptOption {
  value: string; // Internal identifier
  label: string; // Display name
  description: string; // Explains the prompt's role
  fullPromptText: string; // The actual text sent to the AI
}

// 🛑 Sample List of Pre-configured System Prompts
const predefinedPrompts: SystemPromptOption[] = [
  {
    value: 'professional_summary',
    label: 'Professional Summary Writer',
    description: 'Generates concise, factual summaries focusing on expert analysis and data verification.',
    fullPromptText: "You are an expert content strategist. Your goal is to write a 500-word, professional summary based on the user's prompt, using the provided search results only to ensure factual accuracy and a neutral tone.",
  },
  {
    value: 'social_media_thread',
    label: 'Social Media Thread Creator',
    description: 'Formats content into engaging, hook-driven, and highly scannable short threads suitable for X.',
    fullPromptText: "You are a top-tier social media engagement specialist. Convert the user's topic into a 7-part viral X thread. Start with a compelling hook, use emojis judiciously, and end with a strong call-to-action.",
  },
  {
    value: 'opinion_essay',
    label: 'Opinion & Editorial Essayist',
    description: 'Adopts a strong, argumentative, and persuasive tone suitable for opinion pieces.',
    fullPromptText: "You are a seasoned editorial essayist. Develop a persuasive 800-word argument supporting or opposing the user's topic, maintaining a strong, authoritative voice. Cite your sources clearly.",
  },
];

// -------------------------------------------------------------

export const SystemPromptSelector = ({ onPromptChange }: { onPromptChange: (prompt: string) => void }) => {
  const [selectedPromptValue, setSelectedPromptValue] = useState<string>(predefinedPrompts[0].value);
  const [selectedPrompt, setSelectedPrompt] = useState<SystemPromptOption>(predefinedPrompts[0]);

  // Handle selection change
  const handleChange = (value: string) => {
    setSelectedPromptValue(value);
    const newPrompt = predefinedPrompts.find(p => p.value === value);
    if (newPrompt) {
      setSelectedPrompt(newPrompt);
      // Pass the *full text* of the system prompt back to the parent form/state
      onPromptChange(newPrompt.fullPromptText);
    }
  };

  // Call the initial change handler to set the default value
  React.useEffect(() => {
    onPromptChange(predefinedPrompts[0].fullPromptText);
  }, []); // Run only once on mount

  return (
    <div className="p-4 container-full bg-white rounded-lg border border-gray-200 shadow-sm space-y-4">

      <div className="flex items-center space-x-2 border-b pb-2 mb-2">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-black">Content Strategy</h3>
      </div>

      <div>
        <Label htmlFor="system-prompt-select" className="text-black/80 font-medium mb-1 block">
          Choose Content Style:
        </Label>
        <Select value={selectedPromptValue} onValueChange={handleChange}>
          <SelectTrigger id="system-prompt-select" className="w-full bg-neutral-50 border-gray-300 text-black">
            <SelectValue placeholder="Select a strategy..." />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {predefinedPrompts.map((prompt) => (
              <SelectItem key={prompt.value} value={prompt.value}>
                {prompt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description Panel */}
      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md text-sm space-y-1">
        <div className="flex items-center space-x-2 text-indigo-800 font-semibold">
          <Lightbulb className="h-4 w-4" />
          <span>Style Description:</span>
        </div>
        <p className="text-indigo-900 leading-relaxed">
          {selectedPrompt.description}
        </p>
      </div>
    </div>
  );
};