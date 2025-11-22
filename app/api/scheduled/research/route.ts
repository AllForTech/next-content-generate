import { getTrendingTopics } from "@/lib/tavily/tavily.search";
import { generateText, stepCountIs, tool } from "ai"; // Vercel AI SDK for text generation
import { google } from "@ai-sdk/google";
import { GENERATOR_PROMPT } from '@/lib/AI/ai.system.prompt';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { searchUnsplashImages } from '@/lib/AI/ai.image';
import { saveContentImages } from '@/lib/db/content'; // Using the Google provider

// Set the cron job's user ID (You should replace this with a real admin UUID from your DB)
const CRON_AUTHOR_ID = process.env.CRON_AUTHOR_ID!;

/**
 * Vercel Cron Job API Endpoint: Automatically generates blog posts based on trending topics.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const searchParams = request.nextUrl.searchParams;

  // const userId = searchParams.get('user_id');
  // const prompt = searchParams.get('prompt');
  //
  // // --- 1. Security Check ---
  // if (authHeader !== `Bearer ${CRON_AUTHOR_ID}`) {
  //   return new Response('Unauthorized: Invalid secret.', { status: 401 });
  // }

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
        tools: {
          unsplash: tool({
            // 🚨 The description tells the LLM WHEN to use the tool.
            description: 'Searches the free Unsplash library for high-quality stock photos related to the content topic. Use this to find image URLs for visual elements.',

            // The input schema guides the LLM on what arguments to provide.
            inputSchema: z.object({
              query: z.string().describe('The primary Alt description to find relevant images (e.g., "AI infrastructure" or "sustainable architecture").'),
              count: z.number().optional().default(3).describe('The maximum number of image results to return, defaulting to 3.'),
            }),

            // The execute function calls your core logic
            execute: async ({ query, count }) => {
              const images = await searchUnsplashImages(query, count);
              if (images){
                const parsedImage = JSON.parse(images);
                if (!Array.isArray(parsedImage)){
                  return images;
                }
                return images;
              }
              return images;
            },
          }),
        },
        stopWhen: stepCountIs(10),
        system: GENERATOR_PROMPT,
        prompt: generationPrompt,
      });

      console.log("from cron job",result.text);

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