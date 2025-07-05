import {genResearch} from "@/lib/ai/gemini/gen-keyword-research";
import {NextResponse} from "next/server";

export async function POST(req){
    const prompt = await req.json()

    const research = await genResearch(prompt);
    return NextResponse.json(research)
}