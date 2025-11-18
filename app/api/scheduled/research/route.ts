import { getTrendingTopics } from "@/lib/tavily/tavily.search";
import { generateText } from "ai"; // Vercel AI SDK for text generation
import { google } from "@ai-sdk/google";
import { GENERATOR_PROMPT } from '@/lib/AI/ai.system.prompt'; // Using the Google provider

// Set the cron job's user ID (You should replace this with a real admin UUID from your DB)
const CRON_AUTHOR_ID = process.env.CRON_AUTHOR_ID || '00000000-0000-0000-0000-000000000000';

/**
 * Vercel Cron Job API Endpoint: Automatically generates blog posts based on trending topics.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');

  // --- 1. Security Check ---
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized: Invalid secret.', { status: 401 });
  }

  // --- 2. Fetch Trending Topics using Tavily ---
  let topics = [];
  try {
    const tavilyResults = await getTrendingTopics();
    topics = tavilyResults.map(result => ({
      title: result.title,
      url: result.url,
      content: result.content
    }));

    if (topics.length === 0) {
      console.log('Tavily returned no trending topics.');
      return Response.json({ message: 'No topics found.', status: 'success' });
    }

  } catch (error) {
    console.error("Failed to fetch trending topics:", error);
    return Response.json({ message: 'Tavily search failed.', status: 'error' }, { status: 500 });
  }

  let generatedCount = 0;

  // --- 3. Iterate, Generate, and Save ---
  for (const topic of topics) {
    const generationPrompt = `Write a professional, 800-word blog post on the topic: "${topic.title}". The tone should be insightful and expert-level. Incorporate key facts from this search snippet: "${topic.content}". Focus on actionable advice or a detailed analysis of the trend.`;

    try {
      // Vercel AI SDK call using generateText (non-streaming, ideal for server tasks)
      const result = await generateText({
        model: google('gemini-2.5-flash'),
        system: GENERATOR_PROMPT,
        prompt: generationPrompt,
      });

      console.log(result.text);

      generatedCount++;

    } catch (error) {
      console.error(`Generation or saving failed for topic: ${topic.title}`, error);
      // Continue to the next topic even if one fails
    }
  }

  // --- 5. Final Response ---
  return Response.json({
    message: `Cron Job completed. Generated and saved ${generatedCount} blog posts.`,
    status: 'success'
  });
}