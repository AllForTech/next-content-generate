import { tool } from 'ai';
import { scrapeUrl } from '@/lib/scraper/scraper';
import { z } from 'zod';
import { executeTavilySearch } from '@/lib/tavily/tavily.search';

export const urlScraperTool = tool({

  description: 'If the user provides a specific, complete URL (e.g., "https://...") for content extraction or summarization, use this tool to retrieve the raw text of the webpage before responding.',

  // Defines the single input parameter: a URL string
  inputSchema: z.object({
    // The LLM will look for a valid URL string in the user's message
    url: z.string().url().describe('The single, valid, full URL to be scraped.'),
  }),

  // This is the function the AI SDK calls when the LLM requests the tool
  execute: async ({ url }) => {
    // We call the actual scraping logic here
    return scrapeUrl(url);
  },
});


export const tavilySearchTool = tool({

  description: 'Performs a comprehensive, real-time web search for information or data that is not available in the current context or user-provided documents. Use this for general research and fact-checking.',

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
