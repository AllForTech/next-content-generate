import {NextResponse} from "next/server";
import {GenerateKeywordsObject} from "@/lib/ai/action";

export async function POST(req){
    const research = await req.json()

    try {
        const {keywords, relatedKeywords} = await GenerateKeywordsObject(research);
        console.log(keywords)
        return NextResponse.json(relatedKeywords)
    }catch (e) {
        console.log(e)
    }
}