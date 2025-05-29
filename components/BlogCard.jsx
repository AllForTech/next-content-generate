'use client'
import React, {useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import img from "@/assets/ChatGPT Image Apr 11, 2025, 01_35_44 PM.png"
import {cn, formatDateToMDY} from "@/lib/utils";
import {deleteBlog} from "@/lib/supabase/actions";
import Loader from "@/components/Loader";

const BlogCard = ({blog, content, setCount}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await deleteBlog(blog.blog_id)
            setCount(prev => prev + 1)
        }catch (e) {
            console.log(e)
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`cursor-pointer hover:scale-[1.05] border-purple-600 transition-all duration-300 overflow-hidden rounded-md w-[94%] h-[270px] mx-auto relative center bg-white`}>
            <Link href={ `/dashboard/blog/${blog?.blog_id}`} className={`rounded-md relative w-full h-full p-[5px] !justify-between gap-[5px] flex-col mx-auto center bg-white `}>
                <div className={'w-full h-full rounded-md overflow-hidden center'}>
                    {/*<Image src={url} alt={'a'} width={300} height={300} objectFit={'cover'} className={'w-full h-fit'}/>*/}
                </div>
                <div className={'w-[97%] h-[50px] px-[5px] center border-b-[1px] border-black'}>
                    <span className={cn(`text-black/90 text-sm m-auto mb-5 font-semibold font-sans`)}>{content?.slice(2,45) + "..."}</span>
                </div>
                <div className={'center !justify-between w-full h-fit flex-row p-[10px]'}>
                    <p className={'text-sm text-black/90 center font-normal'}>created at</p>
                    <span className={'w-fit center font-normal text-black/90 text-sm'}>{formatDateToMDY(blog.created_at)}</span>
                </div>
            </Link>
            <button onClick={handleDelete} type='button' className={'size-[30px] z-[20] center bg-zinc-300 absolute bottom-[100px] right-[10px] text-sm rounded-sm'}>
                {isLoading ? (<Loader/>) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3" className={'fill-red-500'}><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                )}
            </button>
        </div>
    )
}
export default BlogCard
