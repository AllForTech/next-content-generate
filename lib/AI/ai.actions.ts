'use server'
import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { PromptEngineer } from '@/lib/AI/ai.system.prompt';

const model = google('gemini-2.5-flash');

export async function fileToBase64(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString('base64');
}

export async function refinePrompt(prompt: string){

  try{
    const response = await streamText({
      model,
      prompt,
      system: PromptEngineer,
    })

    let fullContent = "";
    for await (const chunk of response.textStream) {
      fullContent += chunk;
    }

    return fullContent
  }catch (err){
    return prompt;
  }
}