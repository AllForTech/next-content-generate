'use server'
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import {PROFESSIONAL_CONTENT_CREATOR} from "@/lib/AI/ai.system.prompt";


const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables.");
}

// 1. Define the AI Model
const model = google('gemini-2.5-flash-preview-05-20');

// 2. Define the Professional System Prompt
// This is the combined, comprehensive instruction from our previous conversation.

export async function makeResearch(query: string, domains: string[]) {

    const result = streamText({
      model: model,

      // Pass the detailed system instructions
      system: PROFESSIONAL_CONTENT_CREATOR,

      // Pass the user's specific request
      prompt: `Generate a comprehensive article on the topic: "${query}". ${domains.length > 0 ? `Focus on information from these domains: ${domains.join(', ')}` : ''}`,
    });

    for await (const text of result.textStream){
        console.log(text)
    }
    // The AI SDK returns the stream directly, ready to be piped to the client
    return result.textStream;
}