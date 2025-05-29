"use client"
import React, {useState} from 'react'
import FormField from "@/components/FormField";

const Page = () => {
    const [content, setContent] = useState({})

    return (
        <div className={'center text-black container-full '}>
            <FormField setContent={setContent}/>
        </div>
    )
}
export default Page
