"use server"

import {generateObject, generateText} from "ai";
import {google} from "@ai-sdk/google";
import {z} from "zod";
import {generateContentSystemPrompt, researchAssistantPrompt} from "@/constants";

export async function getBlogMarkDown(prompt){
    const { text } = await generateText({
        model: google('gemini-2.0-flash-001'),
        system: `you are an expert seo blog writer, you will be given a research report, your job is to write an excellent and well-structured blog post that is informative, engaging, and free from plagiarism.
 a research report will be provided to you, you will need to use it to write a blog post.
 reference some facts from the research report, and use them to write your blog post avoid any special characters, use only english letters, numbers, and spaces.
 your response should be in a markdown format, follow this rule: 
      1. Use *headings* (# for main title, ## for subheadings).
      2. Format *paragraphs* correctly with a blank line between each one.
      3. Use *unordered lists* (- or *) for bullet points, and *ordered lists* (1., 2., etc.) where appropriate.
      4. Format *links* as [text](URL) and *images* as ![alt text](imageURL).
      5. If any *code* is included, use proper Markdown code blocks with triple backticks (\`\`\`\`).
      6. *Quotes* should be formatted with >.
      7. The content should be *well-structured*, with clear sections and easy-to-read formatting.
 hare is the research result:  ${prompt}`,
        prompt: `hare is the research result:  ${prompt}`
    })

    return text
}


export async function getKeyword(keyWord){
    const { text } = await generateText({
        model: google("gemini-2.0-flash-001"),
        system: `${researchAssistantPrompt}`,
        prompt: `i want you to get results that are base on this keyWord :     ${keyWord}`
    })

    return text
}

export async function GenerateContent(research,prompt,blogType){
    const schema = z.object({
        topic: z.string(),
        content: z.object({
            introduction: z.string(),
            section: z.array(z.object({
                heading: z.string(),
                body: z.string(),
                stepsTOStaySafe: z.array(z.string()).optional(),
                effect: z.array(z.string()).optional(),
                control: z.array(z.string())
            })),
            conclusion: z.string(),
            keywords: z.array(z.string()),
            relatedKeywords: z.array(z.string()).optional(),
        })
    })
        // system: `you are an expert that generate a blog content base on the research result provided to you be concise and be more interesting and also, reference any point in the blog, the key point is ${prompt}`,

    const { object } = await generateObject({
        model: google('gemini-2.0-flash-001'),
        schema,
        system: `You are a professional blog writer and SEO expert. Your job is to generate engaging, well-structured, factually accurate, and SEO-friendly blog posts based on the user’s topic and research results provided to you,
         be concise and be more interesting and also, reference any point in the blog, the key point is ${prompt}. Each blog post should:

"Start with a catchy, relevant topic",

"Include a brief, compelling introduction",

"Be broken into clear, well-organized sections using H2 and H3 headers",

"Provide helpful, well-researched information, explained clearly",

"Use a friendly, informative tone (unless otherwise specified)",

"do NOT wrap in markdown fences.",

"do NOT return a markdown",

"exclude ** or any special characters like '/','\'.",

"Do NOT include comments, explanatory text, or any keys not in the schema.",

"Escape all internal quotation marks.",

"If unsure about data, make a reasoned guess—never output null.",

Always aim for clarity, readability, and value to the reader. Use bullet points or examples when useful. Avoid fluff or repetition. Follow any instructions or style preferences from the user.`,
        prompt: `hare is the research result: \n ${research}. \n the blog should be ${blogType} blog`
    })

    console.log(object)
    return object
}
