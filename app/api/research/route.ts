import { NextResponse } from "next/server";
import { stepCountIs, streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import {z} from "zod";
import {PROFESSIONAL_CONTENT_CREATOR} from "@/lib/AI/ai.system.prompt";

export const runtime = 'edge';
const model = google('gemini-2.5-flash');


export async function POST(req: Request) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    try {

        const result =  streamText({
            model: model,
            system: PROFESSIONAL_CONTENT_CREATOR,
            tools: {
            makeResearch: tool({
                description: `A tool to search Google for real-time information, news, and facts.`,
                inputSchema: z.object({
                    researchResult: z.string().describe('The research result of the prompt.'),
                    domains: z.array(z.string()).optional().describe("A list of domains to prioritize (e.t., 'wikipedia.org').")
                }),
                execute: async ({ researchResult, domains }) => {
                    console.log('from tool', researchResult, domains)
                    return {
                        researchResult,
                        domains
                    }
                },
            }),
        },
            stopWhen: stepCountIs(2),
            prompt: `Write the full document on: "${prompt}"`,
        });

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.textStream) {
                    controller.enqueue(chunk);
                }
                controller.close();
            },
        });

        return new Response(stream);

    } catch (error) {
        console.error("Error in RAG flow:", error);
        return NextResponse.json({ error: "Failed to generate factual content" }, { status: 500 });
    }
}