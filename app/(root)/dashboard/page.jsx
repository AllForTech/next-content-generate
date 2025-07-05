'use client'
import empty_logo from "@/assets/empty-project.png"
import Image from "next/image";
import BlogCard from "@/components/BlogCard";
import React, {use, useEffect, useState} from "react";
import {getBlogs} from "@/lib/supabase/actions";
import Link from "next/link";
import Loader from '@/components/Loader'
import {Skeleton} from "@/components/ui/skeleton";

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
                <h2 className="text-black dark:text-white hidden md:flex text-md font-semibold no-wrap">Dashboard</h2>
                <div className={"center w-full md:w-fit md:space-x-[30px] h-fit !justify-between flex-row"}>
                    <div className={"w-[80px] text-nowrap text-black dark:text-white font-bold h-fit p-[2px] md:p-[5px] text-xs center flex-row"}>
                        total: {blogs?.length | "0"}
                    </div>

                    <div className={`md:w-[100px] w-[85px] center h-fit !justify-between z-[4] gap-[10px]`}>
                        <Link href='/dashboard/create' className={`w-full bg-zinc-900 dark:bg-white rounded-md h-[30px] md:h-[35px] center flex-row`}>
                            <div className={`w-fit md:text-sm text-xs font-regular text-white dark:text-black`}>
                                create blog
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
            {isLoading ? (<Loader/>) : (<div className={"w-full h-full items-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-[10px] lg:p-[4px] space-y-[30px] justify-center overflow-y-auto"} id={"no-scrollbar"}>
                {blogs?.length > 0 & !isLoading ? blogs.map((blog) => {
                        const content = blog.content
                        return(<BlogCard key={blog?.id} blog={blog} content={content} setCount={setCount}/>)
                    }
                ): (
                    <>
                        <Skeleton className={"w-[94%] h-[270px] rounded-md dark:bg-zinc-800 m-auto mb-[15px]"}/>
                        <Skeleton className={"w-[94%] h-[270px] rounded-md dark:bg-zinc-800 m-auto mb-[15px]"}/>
                        <Skeleton className={"w-[94%] h-[270px] rounded-md dark:bg-zinc-800 m-auto mb-[15px]"}/>
                        <Skeleton className={"w-[94%] h-[270px] rounded-md dark:bg-zinc-800 m-auto mb-[15px]"}/>
                        <Skeleton className={"w-[94%] h-[270px] rounded-md dark:bg-zinc-800 m-auto mb-[15px]"}/>
                        <Skeleton className={"w-[94%] h-[270px] rounded-md dark:bg-zinc-800 m-auto mb-[15px]"}/>
                    </>
                )
                }

            </div>)}
            {/*{!blogs & !isLoading && (*/}
            {/*    <div  className={"center w-fit h-fit space-y-[30px] mb-[10%] flex-col"}>*/}
            {/*        <span className={"text-sm text-black/40 font-bold"}>you have no document yet</span>*/}
            {/*        <Image src={empty_logo} alt="empty-project" width={200} height={200} className={"opacity-[.9]"}/>*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    )
}
export default Page
