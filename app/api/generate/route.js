import {GenerateContent, getBlogMarkDown, getKeyword} from "@/lib/ai/action";
import {createClient} from "@/utils/supabase/client";
import {getBlogImage} from "@/lib/unsplash/action";


export async function GET(req){
    return Response.json({success: true, message: 'welcome'})
}

export async function POST(req){
    // const { values } = await req.json()
   const value = await req.json()

    console.log(value)

    const text = await getKeyword(value)

    const object = await getBlogMarkDown(text)

    // const object = await GenerateContent(text,prompt,blogType)
    //
    // const result = await getBlogImage()
    //
    const supabase = await createClient()

    const {data, error } = await supabase.from('blogs').insert({
        content: object,
    })

    if(error) return  Response.json({error})

    console.log(object)
    return Response.json({success: true, object, data})
}