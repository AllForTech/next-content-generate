import { NextResponse } from "next/server";
import { streamText } from 'ai';
import { GENERATOR_PROMPT, PROFESSIONAL_CONTENT_CREATOR } from '@/lib/AI/ai.system.prompt';
import { google } from '@ai-sdk/google';

export const runtime = 'edge';

// gemini-2.5-flash-preview-05-20
const model = google('gemini-2.5-flash');

export async function POST(req: Request) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    try {
      const result = streamText({
        model: model,

        // Pass the detailed system instructions
        system: GENERATOR_PROMPT,


        // Pass the user's specific request
        prompt: `Generate a comprehensive article on the topic: "${prompt}"`,
      });

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.textStream) {
                  console.log("from api route",chunk);
                    controller.enqueue(chunk);
                }
                controller.close();
            },
        });



        return new Response(stream);
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}