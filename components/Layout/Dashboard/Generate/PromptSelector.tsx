'use client'

import React, { useState } from 'react';
import {
  Feather, // Placeholder icon for writing
  FileText,
  Rocket,
  Search,
  Zap,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useContent } from '@/context/GenerationContext';

// --- Prompt Data Structure ---
interface Prompt {
  id: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  fullPrompt: string;
}

// --- List of Well-Written Prompts ---
const professionalPrompts: Prompt[] = [
  {
    id: 'p-1',
    title: 'Executive Summary Generator',
    icon: FileText,
    summary: 'Analyze a 500-word document and extract the three most critical takeaways, summarizing them into a professional executive overview, suitable for C-level review.',
    fullPrompt: 'Analyze the provided text. Identify the three most critical business insights, risks, or opportunities. Summarize these points into a single, concise executive summary paragraph, maintaining a formal and objective tone.',
  },
  {
    id: 'p-2',
    title: 'SEO-Optimized Blog Post',
    icon: TrendingUp,
    summary: 'Generate a 1000-word blog post on "The Future of Quantum Computing," incorporating a required set of five target keywords naturally throughout the text.',
    fullPrompt: 'Draft a 1000-word SEO-optimized blog post titled "The Future of Quantum Computing." The post must include the following keywords: [quantum entanglement], [superposition], [qubit], [d-wave], and [quantum supremacy]. Structure the post with a compelling introduction, three detailed body sections, and a conclusion with a clear call to action.',
  },
  {
    id: 'p-3',
    title: 'Competitive Analysis Report',
    icon: Search,
    summary: 'Conduct a high-level competitive analysis of three specified companies, detailing their market position, primary product, and unique selling proposition (USP).',
    fullPrompt: 'Perform a high-level competitive analysis comparing Company A, Company B, and Company C. For each company, detail their current market share (if known), their flagship product, their core technology advantage, and a concise summary of their Unique Selling Proposition (USP). Present the findings in a clear, comparative table format.',
  },
  {
    id: 'p-4',
    title: 'Viral Social Media Campaign',
    icon: Rocket,
    summary: 'Design a three-part social media campaign (Twitter thread, LinkedIn post, Instagram caption) to promote a new SaaS feature launch.',
    fullPrompt: 'Design a high-impact, three-part social media campaign to promote the launch of a new SaaS feature: "Real-time AI Document Collaboration." Create a compelling, detailed Twitter thread (max 7 tweets), a professional LinkedIn post focused on business value, and a short, engaging Instagram caption with relevant hashtags.',
  },
];


export const PromptSelector = () => {
  // State to track the ID of the currently selected prompt
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  
  const { setPrompt } = useContent();

  // Derive the full details of the selected prompt
  const selectedPrompt = professionalPrompts.find(p => p.id === selectedPromptId);

  const handleSelect = (id: string, prompt = '') => {
    setSelectedPromptId(id === selectedPromptId ? null : id);
    setPrompt(prompt);
  };

  return (
    <div className="font-sans p-6 bg-neutral-50 rounded-xl shadow-lg border border-neutral-200">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center">
        <Feather className="w-6 h-6 mr-3 text-black" />
        Prompt Templates Library
      </h2>
      <p className="text-neutral-600 mb-6 border-b pb-3 text-sm">
        Select a template to instantly load a professionally written prompt into the editor, or use it as inspiration.
      </p>

      {/* Prompt Grid Container (Responsive Layout) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {professionalPrompts.map((prompt) => {
          const isSelected = prompt.id === selectedPromptId;
          const IconComponent = prompt.icon;

          return (
            <motion.div
              key={prompt.id}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01, zIndex: 10 }}
              onClick={() => handleSelect(prompt.id, prompt.fullPrompt)}
              className={cn(
                'group p-4 rounded-xl border-2 transition-300 cursor-pointer shadow-sm',
                'flex flex-col justify-between min-h-[180px]',
                // Default state
                'bg-white border-neutral-200 hover:border-black/50 hover:shadow-md',
                // Selected state
                isSelected
                  ? 'border-black bg-black text-white shadow-xl ring-2 ring-offset-2 ring-black/50'
                  : 'text-neutral-900',
              )}
            >
              <div className="mb-4">
                <div className={cn(
                  'p-2 rounded-full mb-3 inline-block transition-colors duration-300',
                  isSelected
                    ? 'bg-white text-black'
                    : 'bg-neutral-100 text-neutral-700 group-hover:bg-black group-hover:text-white',
                )}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold",
                  isSelected ? 'text-white' : 'text-neutral-900 group-hover:text-black'
                )}>
                  {prompt.title}
                </h3>
              </div>

              <div className="text-xs opacity-90">
                <p className={cn(
                  "line-clamp-3",
                  isSelected ? 'text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-800'
                )}>{prompt.summary}</p>
              </div>

              {isSelected && (
                <div className="mt-3 flex items-center text-xs font-semibold text-white">
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Selected
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/*/!* Selected Prompt Display (for demonstration) *!/*/}
      {/*{selectedPrompt && (*/}
      {/*  <motion.div*/}
      {/*    initial={{ opacity: 0, y: 20 }}*/}
      {/*    animate={{ opacity: 1, y: 0 }}*/}
      {/*    className="mt-8 p-5 bg-black rounded-xl shadow-xl border border-neutral-700"*/}
      {/*  >*/}
      {/*    <h3 className="flex items-center text-lg font-bold text-white mb-2">*/}
      {/*      <Zap className="w-5 h-5 mr-2 text-yellow-400" />*/}
      {/*      Active Prompt Text*/}
      {/*    </h3>*/}
      {/*    <p className="font-mono text-sm text-neutral-300 whitespace-pre-wrap">*/}
      {/*      {selectedPrompt.fullPrompt}*/}
      {/*    </p>*/}
      {/*    <p className="mt-4 text-xs text-neutral-500">*/}
      {/*      *This text is now ready to be loaded into your main input field.**/}
      {/*    </p>*/}
      {/*  </motion.div>*/}
      {/*)}*/}
    </div>
  );
};