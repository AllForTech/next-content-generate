import { NextResponse } from "next/server";
import { executeTavilySearch } from '@/lib/tavily/tavily.search';

export const runtime = 'nodejs';


export async function POST(req: Request) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    try {
        const response = await executeTavilySearch(prompt);

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error in RAG flow:", error);
        return NextResponse.json({ error: "Failed to generate factual content" }, { status: 500 });
    }
}