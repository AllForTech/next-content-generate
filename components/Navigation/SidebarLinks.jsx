'use client'
import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";

const SidebarLinks = ({title, href, icon}) => {
    const path = usePathname()

    return (
        <Link href={href} className={`group justify-start w-full p-[5px] h-[50px] transition-all duration-500 rounded-md text-sm hover:bg-purple-400 text-black flex items-center ${path === href? "primary !text-white" : "bg-zinc-200"}`}>
           <div className={`group-hover:text-white size-[40px] center`}>
               {icon}
           </div>
            <p className={` text-black group-hover:flex w-full justify-start pl-[20px] items-center  transition-all duration-700 hidden ${path === href && "text-white"}`}>
                {title}
            </p>
        </Link>
    )
}
export default SidebarLinks
