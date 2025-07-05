import {GoogleGenAI} from '@google/genai'

export async function GET(req){
    return Response.json({success: true, message: 'welcome'})
}

const system = `you are an expert seo blog writer, you will be given a research report, your job is to write an excellent and well-structured blog post that is informative, engaging, and free from plagiarism.
 a research report will be provided to you, you will need to use it to write a blog post.
 reference some facts from the research report, and use them to write your blog post avoid any special characters, use only english letters, numbers, and spaces,
 you will be provided with image URLs and an Alt description of the image. use the Url in the blog.
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
 11. your response should not start with ,,, or "markdown".
 12. if image url are included in research, do NOT include them in the blog.
 13. only include the image URLs that will be passed to you through th prompt, not the research result.
 14. if links are included in the research, include them in the blog.
 Always aim to make the blog more engaging and interesting.`

export async function POST(req){
    const {research} = await req.json()

    // Generate blog as markdown
    const encoder = new TextEncoder()
    const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY })
    const geminiStream = await genAI.models.generateContentStream({
        model: 'gemini-2.0-flash',
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: `${system}\n.
         your response should be in a markdown format. and must start with #. return only the markdown and nothing else. tour response should ot start with ,,, or '''.`
                    }
                ]
            },{
            role: 'user',
                parts: [
                    {
                        text: `and hare is the research result: \n ${research}`
                    }
                ]
            }
        ]
    })

    const stream = new ReadableStream({
        async start(controller){
            try{
                for await (const chunk of geminiStream) {
                    const text = chunk.text
                    controller.enqueue(encoder.encode(text))
                }
                controller.close()
            } catch (e) {
                console.error(e)
                controller.enqueue(encoder.encode("[stream error]"));
                controller.close();
            }
        }
    })

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
        },
    })
}