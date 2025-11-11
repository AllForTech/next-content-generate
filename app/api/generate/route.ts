import { NextResponse } from "next/server";
import { stepCountIs, streamText } from 'ai';
import { GENERATOR_PROMPT } from '@/lib/AI/ai.system.prompt';
import { google } from '@ai-sdk/google';
import { saveGeneratedContent } from '@/lib/db/content';
import { ContentGenerationResponse } from '@/lib/schema';
import { tavilySearchTool, unsplashSearchTool, urlScraperTool } from '@/lib/AI/tools';

export const runtime = 'nodejs';

const model = google('gemini-2.5-flash');

export async function POST(req: Request) {
    const { prompt, searchResults, contentType, tags, tone, url } = await req.json();

    if (!prompt || !contentType) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const formatedResult = searchResults?.map((result, i) =>  `result [${i + 1}]: ${result.snippet} 
 source: ${result.source}
`) || [];

    try {
      const result = streamText({
        model: model,

        // Pass the detailed system instructions
        system: `${GENERATOR_PROMPT} \n The user wants the content to have a ${tone} tone.`,

        tools: {
          scrape: urlScraperTool,
          webSearch: tavilySearchTool,
          unsplash: unsplashSearchTool,
        },

        stopWhen: stepCountIs(4),
        // Pass the user's specific request
        prompt: `Hare is the user prompt: "${prompt}" 
 and hare is the search results: ${formatedResult},  ${url ? `The user also provided this URL for reference: ${url}` : ''}`,
      });

        let fullContent = "";
        for await (const chunk of result.textStream) {
            fullContent += chunk;
        }

        const contentToSave: ContentGenerationResponse = {
            contentType: contentType,
            contentKeyword: prompt,
            tags: tags,
            mainContent: fullContent,
        };

        await saveGeneratedContent(contentToSave);

        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(fullContent);
                controller.close();
            },
        });

        return new Response(stream);
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
