import {NextResponse} from "next/server";
import {getBlogImage} from "@/lib/unsplash/action";


export async function POST(req) {
    let images = []
    try {
        const body = await req.json(); // should be an array of keywords
        const query = body.join(", ")
        const result = await getBlogImage(query, 20);

        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal server error', status: 500 });
    }
}
