import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ImageIcon} from "lucide-react";
import SearchInput from "@/components/unsplash/SearchInput";

const ImageDrawer = ({children}) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <div className={'p-[10px] animate-bounce center bg-white rounded-sm border-1 border-zinc-500'}>
                    <ImageIcon size={20} className={'text-black'}/>
                </div>
            </DrawerTrigger>
            <DrawerContent className={'pt-0'}>
                <DrawerHeader>
                    <DrawerTitle>
                    <SearchInput/>

                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                {children}
                <DrawerFooter className={cn(`w-full h-fit px-[15px] flex-row gap-[10px] center !justify-between`)}>
                    <div className={'w-full h-[20px]'}>

                    </div>
                    <DrawerClose>
                        <div className={cn(`bg-zinc-900 p-[10px] transition-500 rounded-sm px-[15px] m-0 text-white outline-none text-xs hover:bg-zinc-500`)}>Cancel</div>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
export default ImageDrawer
