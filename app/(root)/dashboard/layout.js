import React from 'react'
import Header from "@/components/Header";
import Sidebar from "@/components/Navigation/Sidebar";

const Layout = ({ children }) => {
    return (
        <main className={`w-screen h-screen flex items-center justify-center bg flex-col p-[10px] md:p-[10px] gap-[5px] dark:text-white text-black`}>
           <div className={`center h-[8vh] w-full`}>
               <Header>

               </Header>
           </div>

            <div className={`w-full h-[90vh] center !justify-between  gap-[10px] flex-row`}>
                <section  className={`min-[360px]:!flex hidden justify-center !items-start w-fit h-full`}>
                    <Sidebar/>
                </section>
                {/*<div className={'w-[2px] min-[360px]:!flex hidden h-full rounded-full bg-black/30 m-auto'}/>*/}
                <section className={`container-full center relative rounded-md bg-zinc-300/60 shadow-inner`}>
                    {children}
                </section>
            </div>
        </main>
    )
}
export default Layout
