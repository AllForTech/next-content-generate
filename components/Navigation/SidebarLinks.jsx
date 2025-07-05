'use client'
import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";

const SidebarLinks = ({title, href, icon}) => {
    const path = usePathname()

    return (
        <Link href={href} className={`group justify-start w-full p-[5px] h-[40px] transition-all duration-500 rounded-md text-sm hover:bg-zinc-500 dark:hover:bg-zinc-300 text-black flex items-center ${path === href? "button-dark text text-white" : "bg-zinc-200 dark:bg-zinc-500"}`}>
           <div className={`size-[30px] center`}>
               {icon}
           </div>
            <p className={` hover:text text-xs group-hover:flex w-full justify-start pl-[10px] items-center  transition-all duration-700 hidden ${path === href && "text"}`}>
                {title}
            </p>
        </Link>
    )
}
export default SidebarLinks
