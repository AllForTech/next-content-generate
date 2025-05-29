'use client'
import React, {useState} from 'react'
import {generateContent} from "@/lib/general/actions";
import InputField from "@/components/InputField";
import {cn} from "@/lib/utils";
import ContentComponent from "@/components/ContentComponent";
import {ChatUi} from "@/components/mvpblocks/Chat-TextArea";

const FormField = () => {
    const [values, setValues] = useState({
        prompt: '',
        blogTypes: '',
        keyword: ''
    })
    const [content, setContent] = useState({})

    const blogTypes = [
        { value: 'informative', label: 'Informative', icon: 'BookOpen' },
        { value: 'persuasive', label: 'Persuasive', icon: 'Megaphone' },
        { value: 'how-to', label: 'How-To', icon: 'Hammer' },
        { value: 'listicle', label: 'Listicle', icon: 'List' },
        { value: 'opinion', label: 'Opinion', icon: 'Quote' },
        { value: 'news', label: 'News Recap', icon: 'Newspaper' },
    ];


    const handleChange = (e) => {
        // setValue(e.target.value)
        const {name, value} = e.target
        setValues(prevState => ({...prevState, [name]: value}))
        console.log(values)
    }

    const handleClick = (e) => {
        const {name, value} = e.target
        setValues(prevState => ({...prevState, [name]: value}))
        console.log(values)
    }

    const handleSubmit = async (e) => {
        console.log(values)
       const req = await generateContent(values)
        if(req.success){
            console.log(req.content)
            setContent(req.content)
        }else {
            console.log(req)
        }
    }

    return (
        <div className={'container-full center flex-col'}>
            {/*<form className={`container-full center !h-[90%] md:!h-[80%] !w-full md!w-[90%] md:!w-[80%] flex-col p-[20px] rounded-lg `}>*/}
            {/*    <div className={'container-fit !w-full mb-[20px] group rounded-lg !py-[20px] flex-col bg-white'}>*/}
            {/*        <textarea name='prompt' onChange={handleChange} value={values.prompt} placeholder='enter a keyword or prompt' className={'w-full  bg-transparent outline-none border-none placeholder:text-black/60  text-black text-sm h-[70px]'}/>*/}
            {/*        <div className={`relative w-full center h-[40px]`}>*/}
            {/*            <button type={'button'} onClick={handleSubmit} className={`center bd size-[35px] rounded-full emp-bg text-black absolute top-0 right-0`}>*/}

            {/*            </button>*/}
            {/*            <div className={`w-[90%] h-fit gap-[10px] !justify-start center p-[5px] pr-[50px] md:pr-[5px] flex-nowrap overflow-x-auto`} id={'no-scrollbar'}>*/}
            {/*                {blogTypes.map((item) => (*/}
            {/*                    <div key={item.value} className={cn(`w-fit h-fit p-[5px] bg-zinc-300 text-black/90 transition-all duration-300 hover:scale-[1.04] rounded-sm px-[10px] text-sm  center`, {"primary text-white" : values.blogTypes === item.value})}>*/}
            {/*                        <input name='blogTypes' type={'button'} value={item.value} className={`outline-none border-none text-xs  bg-transparent`} onClick={handleClick}/>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
            <ChatUi/>
        </div>
    )
}
export default FormField
