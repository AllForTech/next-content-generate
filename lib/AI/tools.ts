import { tool } from 'ai';
import { scrapeUrl } from '@/lib/scraper/scraper';
import { z } from 'zod';
import { executeTavilySearch } from '@/lib/tavily/tavily.search';
import { searchUnsplashImages } from './ai.image';

export const urlScraperTool = tool({

  description: 'Use this tool to extract text content from one or more specific URLs provided by the user (e.g., "https://source1.com and https://source2.com").',

  inputSchema: z.object({
    // The LLM will gather all valid URLs and put them into this array
    urls: z.array(z.string().url()).describe('An array of all valid URLs provided by the user for scraping.'),
    // Note: I renamed 'url' to 'urls' for clarity
  }),

  // This is the function the AI SDK calls when the LLM requests the tool
  execute: async ({ urls }) => {
    // We call the actual scraping logic here
    return scrapeUrl(urls);
  },
});


export const tavilySearchTool = tool({

  description: 'Performs a comprehensive, real-time web search for information or data that is not available in the current context or user-provided documents. Use this for general [content_id] and fact-checking.',

  // 2. Input Schema: What the LLM MUST provide to use the tool
  inputSchema: z.object({
    // The only required argument is the query string
    query: z.string().describe('The search query for which to find real-time, relevant information.'),
  }),

  // This is the function the AI SDK calls when the LLM requests the tool
  execute: async ({ query }) => {
    // We call the actual scraping logic here
    return executeTavilySearch(query);
  },
});


export const unsplashSearchTool = tool({
  // 🚨 The description tells the LLM WHEN to use the tool.
  description: 'Searches the free Unsplash library for high-quality stock photos related to the content topic. Use this to find image URLs for visual elements.',

  // The input schema guides the LLM on what arguments to provide.
  inputSchema: z.object({
    query: z.string().describe('The primary search term or keyword to find relevant images (e.g., "AI infrastructure" or "sustainable architecture").'),
    count: z.number().optional().default(3).describe('The maximum number of image results to return, defaulting to 3.'),
  }),

  // The execute function calls your core logic
  execute: async ({ query, count }) => {
    return searchUnsplashImages(query, count);
  },
});