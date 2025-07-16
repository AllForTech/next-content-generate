'use client'
import React, {useState} from 'react'
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Menu} from "lucide-react"

const Trigger = ({setIsOpen})=> {
    return(
        <button onClick={()=> setIsOpen(true)} className={cn(`center min-[360px]:!hidden size-[23px] rounded-sm text-xs`)}>
            <Menu size={19} className={"dark:text-white text-black"}/>
        </button>
    )
}

const MobilNavigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={()=> setIsOpen(false)} className={cn(`!fixed inset-0 bg-black/20 !screen z-[9]`, isOpen ? "block" : "hidden")}></div>
            <div className={cn(`w-fit flex sm:hidden`)}>
                <Trigger setIsOpen={setIsOpen}/>
                <aside className={cn(`min-[360px]:hidden flex z-[10] items-center gap-[7px] fixed top-0 px-[40px] justify-start transition-400 flex-col p-2.5 w-[70%] h-[100dvh] bg-dark-theme`,
                    isOpen ? "right-0" : "-right-[100%]")}>
                    <div className={"w-fill h-fit center !justify-start"}>
                        <button className={"size-[23px] center rounded-sm"}>

                        </button>
                    </div>
                    <div className={cn(`container-full !justify-start center gap-[7px] flex-col`)}>
                        <NavLink title={"dashboard"} href={'/dashboard'} setIsOpen={setIsOpen}/>
                        <NavLink title={"create"} href={"/dashboard/create"} setIsOpen={setIsOpen}/>
                        <NavLink title={"explore"} href={"/dashboard/explore"} setIsOpen={setIsOpen}/>
                    </div>
                </aside>
            </div>
        </>
    )
}
export default MobilNavigation

const NavLink = ({href, title, setIsOpen}) => {
    return (
        <Link onClick={()=> setIsOpen(false)} href={href} className={"w-full center !justify-start bg-zinc-200 dark:bg-zinc-800 dark:text-white rounded-xs p-[10px] h-fit text-sm font-semibold capitalize"}>
            {title}
        </Link>
    )
}
