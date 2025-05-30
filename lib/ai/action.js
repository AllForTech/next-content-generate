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
      8. Avoid *fluff* or *repetition*.
      9. the markdown should start with #.
      10. the markdown should end with a blank line.
      11. you response should not start with ,,, or "markdown", it should start with.
      12. only include images if an image url is provided to you.
 hare is the research result:  ${prompt}`,
        prompt: `hare is the research result:  ${prompt}`
    })

    return text
}


export async function getKeyword(keyWord){
    const { text } = await generateText({
        model: google("gemini-2.0-flash-001"),
        system: `${researchAssistantPrompt}`,
        prompt: `i want you to get results that are base on this:     ${keyWord}`
    })

    return text
}

export async function GenerateKeywordsObject(research){
    const schema = z.object({
            keywords: z.array(z.string()),
            relatedKeywords: z.array(z.string()).optional()
    })

    const { object } = await generateObject({
        model: google('gemini-2.0-flash-001'),
        schema,
        system: `You are an expert SEO and keyword extraction assistant.

You will be given a blog post in Markdown format. Your job is to:
1. Carefully analyze the blog content.
2. Extract and return a structured list of keywords and related search terms that are relevant to the blog’s core topic and subtopics.
3. Ensure keywords are suitable for search engines and image search platforms like Unsplash.`,
        prompt: `hare is the markdown of a blog: \n ${research}.`
    })

    console.log(object)
    return object
}
