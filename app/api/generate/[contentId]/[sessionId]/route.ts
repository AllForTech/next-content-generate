import { NextResponse } from "next/server";
import { convertToModelMessages, ModelMessage, stepCountIs, streamText, tool } from 'ai';
import { GENERATOR_PROMPT } from '@/lib/AI/ai.system.prompt';
import { google } from '@ai-sdk/google';
import { saveContent, saveContentGoogleSearches, saveContentImages, saveContentScrapedData, saveGeneratedContent,
  saveNewContent
} from '@/lib/db/content';
import { ContentGenerationResponse } from '@/lib/schema';
import { tavilySearchTool, unsplashSearchTool, urlScraperTool } from '@/lib/AI/tools';
import { searchUnsplashImages } from '@/lib/AI/ai.image';
import { z } from 'zod';
import { executeTavilySearch } from '@/lib/tavily/tavily.search';
import { scrapeUrl } from '@/lib/scraper/scraper';
import { fileToBase64 } from '@/lib/AI/ai.actions';

export const runtime = 'nodejs';

const model = google('gemini-2.5-flash');

export async function POST(req: Request, {params}: { params: { contentId: string, sessionId: string }}) {
    const { contentId, sessionId } = await params;

  const formData = await req.formData();

  // 2. Extract regular fields (assuming you stringified them on the client)
  const promptJson = formData.get('prompt');
  const toneJson = formData.get('tone');
  const urlJson = formData.get('url');

  // Parse the JSON back
  const prompt = typeof promptJson === 'string' ? JSON.parse(promptJson) : promptJson;
  const tone = typeof toneJson === 'string' ? JSON.parse(toneJson) : toneJson;
  const url = typeof urlJson === 'string' ? JSON.parse(urlJson) : urlJson;

  // 3. Extract the file (it comes as a Blob object)
  const uploadedFile = formData.get('document'); // Use the name you append on the client

  let filePayload = null;

  if (uploadedFile && uploadedFile instanceof Blob) {
    // 4. Convert the Blob to a Base64 string in memory (NO DISK I/O)
    const base64Data = await fileToBase64(uploadedFile);

    filePayload = {
      name: uploadedFile.name,
      type: uploadedFile.type,
      // The Base64 string is the data the AI needs for analysis
      base64Data: base64Data,
    };

    console.log(`File received in memory: ${filePayload.name}, Type: ${filePayload.type}`);
  }

    let searchResults = [];
    let unsplashImages = [];
    let scrapedData = []

  const textPart = {
    type: 'text',
    text: `"${prompt}", \n ${url ? `use this URL for reference: ${url}` : ''}, \n ${filePayload ? 'Analyze the attached document and answer the prompt based on its content.' : ''}`,
  };

  const messages: any[] = [
    {
      role: 'user',
      content: [
        // 1. Text Part
        textPart
      ],
    },
  ];

  if (filePayload) {
    const dataURI = `data:${filePayload.type};base64,${filePayload.base64Data}`;

    if (filePayload.type.startsWith('image/')) {
      messages[0].content.push({
        type: 'image',
        // Pass the Base64 string directly to the 'image' field
        image: filePayload.base64Data,
        // Pass the IANA media type explicitly
        mediaType: filePayload.type,
      });
    } else {
      messages[0].content.push({
        type: 'file',
        // Pass the Base64 string directly to the 'data' field
        data: filePayload.base64Data,
        // The 'mediaType' field is REQUIRED for FilePart
        mediaType: filePayload.type,
      });
    }
  }


    try {
      const result = streamText({
        model: model,

        // Pass the detailed system instructions
        system: `${GENERATOR_PROMPT} \n The user wants the content to have a ${tone} tone.`,

        tools: {
          scrape: tool({

            description: 'Use this tool to extract text content from one or more specific URLs provided by the user (e.g., "https://source1.com and https://source2.com").',

            inputSchema: z.object({
              // The LLM will gather all valid URLs and put them into this array
              urls: z.array(z.string().url()).describe('An array of all valid URLs provided by the user for scraping.'),
              // Note: I renamed 'url' to 'urls' for clarity
            }),

            // This is the function the AI SDK calls when the LLM requests the tool
            execute: async ({ urls }) => {
              // We call the actual scraping logic here
              const { content, allScrapedData } = await scrapeUrl(urls);

              scrapedData = allScrapedData;
              await saveContentScrapedData(allScrapedData, contentId);

              return content;
            },
          }),
          webSearch: tool({

            description: 'Performs a comprehensive, real-time web search for information or data that is not available in the current context or user-provided documents. Use this for general research and fact-checking.',

            // 2. Input Schema: What the LLM MUST provide to use the tool
            inputSchema: z.object({
              // The only required argument is the query string
              query: z.string().describe('The search query for which to find real-time, relevant information.'),
            }),

            // This is the function the AI SDK calls when the LLM requests the tool
            execute: async ({ query }) => {
              const results = await executeTavilySearch(query);

              if (!Array.isArray(results)){
                return results;
              }
              searchResults = results;
              await saveContentGoogleSearches(results, contentId);
              return results;
            },
          }),
          unsplash: tool({
            // 🚨 The description tells the LLM WHEN to use the tool.
            description: 'Searches the free Unsplash library for high-quality stock photos related to the content topic. Use this to find image URLs for visual elements.',

            // The input schema guides the LLM on what arguments to provide.
            inputSchema: z.object({
              query: z.string().describe('The primary search term or keyword to find relevant images (e.g., "AI infrastructure" or "sustainable architecture").'),
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
                unsplashImages = parsedImage;
                await saveContentImages(parsedImage, contentId);
                return images;
              }
              return images;
            },
          }),
        },

        stopWhen: stepCountIs(4),
        // Pass the user's specific request
        messages,
      });

        let fullContent = "";
        for await (const chunk of result.textStream) {
            fullContent += chunk;
        }

        await saveContent(fullContent, prompt, contentId, sessionId)
        await saveNewContent(contentId);

      return NextResponse.json({
        contentId: contentId,
        mainContent: fullContent,
        searchResults: searchResults,
        unsplashImages: unsplashImages,
        scrapedData,
        message: "Content generated and saved successfully."
      }, { status: 200 });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
