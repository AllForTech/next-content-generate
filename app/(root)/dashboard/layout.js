import React from 'react'
import Header from "@/components/Header";
import Sidebar from "@/components/Navigation/Sidebar";
import MobilNavigation from "@/components/Navigation/MobilNavigation";

const Layout = ({ children }) => {
    return (
        <main  className={"w-screen h-screen flex items-center justify-center overflow-hidden bg flex-col p-[10px] md:p-[10px] gap-[5px] bg-dark-theme dark:text-dark text-black"}>
           <div className={`center h-[6vh] w-full`}>
               <Header>

               </Header>
           </div>

            <div className={`w-full h-[92vh] relative center !justify-between  gap-[10px] flex-row`}>
                <section  className={`min-[360px]:!flex hidden justify-center !items-start w-fit h-full`}>
                    <Sidebar/>
                </section>
                <section className={`container-full center relative rounded-md bg-zinc-300/50 dark:bg-zinc-700 shadow-inner`}>
                    {children}
                </section>
            </div>
        </main>
    )
}

export default Layout
