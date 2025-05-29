'use client'
import empty_logo from "@/assets/empty-project.png"
import Image from "next/image";
import BlogCard from "@/components/BlogCard";
import React, {useEffect, useState} from "react";
import {getBlogs} from "@/lib/supabase/actions";
import Link from "next/link";
import Loader from '@/components/Loader'

const Page = () => {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(1)

    const fetch = async () => {
        const {success, data} = await getBlogs()

        if(success){
            setBlogs(data)
        }
    }


    useEffect(() => {
        fetch().catch(e => console.log(e))
    }, [count]);

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch().catch(e => console.log(e))
        }catch (e) {
            console.log(e)
        }finally {
            setIsLoading(false)
        }
    }, []);





    return (
        <div className={'relative container-full center flex-col text-black'}>
            <div className=" center !justify-between w-full bg-transperent flex-row h-[60px] px-[10px] md:px-[18px]">
                <h2 className="text-black/80 hidden md:flex text-md font-semibold no-wrap">Dashboard</h2>
                <div className={"center w-full md:w-fit md:space-x-[30px] h-fit !justify-between flex-row"}>
                    <div className={"w-[80px] text-nowrap text-black/90 font-bold h-fit p-[2px] md:p-[5px] text-xs center flex-row"}>
                        total: {blogs?.length}
                    </div>

                    <div className={`md:w-[100px] w-[85px] center h-fit !justify-between z-[4] gap-[10px]`}>
                        <Link href='/dashboard/create' className={`w-full button-accent rounded-full h-[35px] md:h-[40px] center flex-row`}>
                            <div className={`w-fit md:text-sm text-xs font-semibold text-white`}>
                                create blog
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
            {isLoading ? (<Loader/>) : (<div className={"w-full h-full items-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-[10px] lg:p-[4px] space-y-[30px] justify-center overflow-y-auto"} id={"no-scrollbar"}>
                {blogs?.length > 0 && blogs.map((blog) => {
                        const content = blog.content
                        return(<BlogCard key={blog?.id} blog={blog} content={content} setCount={setCount}/>)
                    }
                )
                }

            </div>)}
            {blogs?.length <= 0 && (
                <div  className={"center w-fit h-fit space-y-[30px] mb-[10%] flex-col"}>
                    <span className={"text-sm text-black/40 font-bold"}>you have no document yet</span>
                    <Image src={empty_logo} alt="empty-project" width={200} height={200} className={"opacity-[.9]"}/>
                </div>
            )}

        </div>
    )
}
export default Page
