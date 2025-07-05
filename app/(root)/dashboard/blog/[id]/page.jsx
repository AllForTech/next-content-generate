
import React from 'react'
import {getBlogImageFromDb, getBlogsContentById} from "@/lib/supabase/actions";
import ContentWrapper from "@/components/content/ContentWrapper";
import {demoBlog} from "@/constants";
import {getBlogImage} from "@/lib/unsplash/action";

const Page = async ({params}) => {
    const {id} = await params
    const response = await getBlogsContentById(id)

    // const blogs = typeof response?.data[0]?.content === 'string' ? JSON.parse(response.data[0]?.content) : response?.data[0]?.content;

    return (
        <ContentWrapper response={response.data[0].content}/>
    )
}
export default Page
