import React from 'react'
import {Skeleton} from "@/components/ui/skeleton";

const Loader = () => {
    return (
        <div className={'center container-full space-x-[20px]'}>
            <Skeleton className={'w-[300px] h-[270px] rounded-md bg-zinc-300'}/>
            <Skeleton className={'w-[300px] h-[270px] rounded-md bg-zinc-300'}/>
        </div>
    )
}
export default Loader
