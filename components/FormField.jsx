'use client'
import React, {useEffect, useState} from 'react'
import {generateContent} from "@/lib/general/actions";
import InputField from "@/components/InputField";
import {cn} from "@/lib/utils";
import ContentComponent from "@/components/content/ContentComponent";
import {ChatUi} from "@/components/mvpblocks/Chat-TextArea";
import StreamMarkdownContainer from "@/components/content/StreamMarkdownContainer";


const FormField = () => {
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        if(content){
            console.log(content)
        }

    }, [content])

    return (
        <div className={'container-full relative center flex-col overflow-hidden'}>
            <StreamMarkdownContainer content={content} setContent={setContent} images={images} setImages={setImages} isLoading={isLoading} setIsLoading={setIsLoading}/>
            <ChatUi setContent={setContent} content={content} isLoading={isLoading}  setIsLoading={setIsLoading} setImages={setImages}/>
        </div>
    )
}
export default FormField 

