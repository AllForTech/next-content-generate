'use client'
import React from 'react'
import SidebarLinks from "@/components/Navigation/SidebarLinks";
import {usePathname} from "next/navigation";

const Sidebar = () => {
    const path = usePathname()

    return (
        <div className={`group center justify-center w-[40px] hover:w-[150px] hover:justify-start transition-all duration-500 h-full items-center rounded-lg`}>
            <div className={`container-full !p-[0px] center rounded-md flex-col transition-all duration-500 !justify-between`}>
                <div className={`w-full transition-all duration-500 h-fit center flex-col !items-start gap-[10px] py-[5px]`}>
                    <SidebarLinks title={"dashboard"} href={'/dashboard'} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" className={`${path === "/dashboard" ? "fill-white dark:fill-black" : "fill-black" } hover:fill-white hover:dark:fill-black`} viewBox="0 -960 960 960" width="20px" fill="black"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                    }/>
                    <SidebarLinks title={"create"} href={"/dashboard/create"} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" className={`${path === "/dashboard/create" ? "fill-white dark:fill-black" : "fill-black"} hover:fill-white hover:dark:fill-black`} viewBox="0 -960 960 960" width="20px" fill='black'><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    }/>
                    <SidebarLinks title={"explore"} href={"/dashboard/explore"} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" className={`${path === "/dashboard/explore" ? "fill-white dark:fill-black" : "fill-black"} hover:fill-white hover:dark:fill-black`} viewBox="0 -960 960 960" width="20px" fill="black"><path d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"/></svg>
                    }/>
                </div>
                <div className={`w-full h-[130px] center`}>

                </div>
            </div>
        </div>
    )
}
export default Sidebar
