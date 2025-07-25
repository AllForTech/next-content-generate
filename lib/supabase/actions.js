'use server'

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import { nanoid } from 'nanoid'
import {redirect} from "next/navigation";

export async function getBlogs(){
   try {
       const supabase = await createClient()

       const {data, error} = await supabase.from('blogs').select()

       if(error) console.log(error)

       const blogs = typeof data === 'string' ? JSON.parse(data) : data;

       return {success: true, data: blogs}
   }catch (e) {
       return {success: false, error: e}
   }
}


export async function getBlogsContentById(id){
    try {
        const supabase = await createClient()

        const {data, error} = await supabase.from('blogs').select().eq('blog_id',id)

        if(error) console.log(error)

        const blogs = typeof data === 'string' ? JSON.parse(data) : data;

        return {success: true, data: blogs}
    }catch (e) {
        return {success: false, error: e}
    }
}

export async function getBlogImageFromDb(id){
    try {
        const supabase = await createClient()

        const {data, error} = await supabase.from('blogs').select().eq('blog_id',id)

        if(error) console.log(error)

        const image = typeof data[0]?.image === 'string' ? JSON.parse(data[0]?.image) : data[0]?.image;

        return {success: true, data: image }
    }catch (e) {
        return {success: false, error: e}
    }
}

export async function deleteBlog(id){
    const supabase = await createClient()

    const {data, error} = await supabase.from('blogs').delete().eq("blog_id", id)

    revalidatePath('/dashboard')

    return !error;

}

export async function saveContent(content){
    const supabase = await createClient()
    const blog_id = nanoid()

    const {data, error} = await supabase.from('blogs').insert({
        content,
    })

    if(error) console.log(error)

    console.log("successfully saved")
}

export async function signInWithGoogle(){
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}



