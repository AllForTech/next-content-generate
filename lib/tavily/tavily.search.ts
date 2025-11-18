'use server'
import { tavily } from '@tavily/core';

const tavilyClient = tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export async function executeTavilySearch(query: string) {
    try {
        const response = await tavilyClient.search(query, {
            maxResults: 5,         // The top 5 most relevant results
            searchDepth: 'basic',  // Faster search, ideal for RAG snippets
            includeAnswer: true
        });

        if (!response){
          console.error("Tavily search execution failed");
          return null;
        }

        const context = response.results.map(result => ({
            snippet: result.content,
            source: result.url,
        }));

        console.log('tavily result:', context);
        return context;

    } catch (error) {
        console.error("Tavily search execution failed:", error);
        return JSON.stringify({ error: "Failed to perform web search." });
    }
}

export async function getTrendingTopics() {
  // This search is designed to find current, trending content for blog posts
  const response = await tavilyClient.search("latest high-impact business and tech trends for blog posts",{
    searchDepth: "basic",
    maxResults: 5, // Get 5 top results to generate 5 blog posts
  });

  return response.results;
}