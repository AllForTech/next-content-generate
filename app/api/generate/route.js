import { GenerateKeywordsObject, getBlogMarkDown, getKeyword} from "@/lib/ai/action";
import {createClient} from "@/utils/supabase/client";
import {getBlogImage} from "@/lib/unsplash/action";


export async function GET(req){
    return Response.json({success: true, message: 'welcome'})
}

export async function POST(req){
   const value = await req.json()

    console.log(value)

    // Make research base on the prompt
    const text = await getKeyword(value)

    // Generate blog from the research provided
    const object = await getBlogMarkDown(text)

    // Extract Keywords related to the blog for query
    const keywords = await GenerateKeywordsObject(object)
    console.log(keywords.keywords)

    //Get image url for the blog
    const result = await getBlogImage(keywords)

    const supabase = await createClient()

    const {data, error } = await supabase.from('blogs').insert({
        content: object,
        image: JSON.stringify(result)
    })

    if(error) return  Response.json({error})

    console.log(object)
    return Response.json({success: true, object, data})
}