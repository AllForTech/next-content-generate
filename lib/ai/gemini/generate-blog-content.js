import {GoogleGenAI} from "@google/genai";
import {system} from "@/constants";

export async function generateBlogContent(formatedUrls, geminiText){
    const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY })
    const geminiStream = await genAI.models.generateContentStream({
        model: 'gemini-2.0-flash',
        contents: `${system}\n hare is the URL of the images: \n ${formatedUrls}\n and hare is the research result: \n ${geminiText.text}\n create a blog from this research result.
         your response should be in a markdown format. and must start with #. return only the markdown and nothing else. tour response should ot start with ,,, or '''.`
    })
}