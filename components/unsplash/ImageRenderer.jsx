'use client'
import React from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
import SearchInput from "@/components/unsplash/SearchInput";

const ImageCard = ({image}) => {
    console.log("the mapped one",image)
    return (
        <div className={'w-[97%] transition-500 hover:scale-[1.05] h-fit center mx-auto rounded-sm overflow-hidden  bg-zinc-300'}>
            <Image src={image?.urls.full} alt={image?.alt_description} width={100} height={100} priority={true} objectFit={"contain"} className={cn(`!w-full !h-auto object-cover`)}/>
        </div>
    )
}

const ImageRenderer = ({images}) => {
    console.log("th images :" , images)
    return (
        <div className={'w-full h-full center flex-col'}>
            <div className={cn(`w-full md:h-[750px] h-full center relative`)}>
                <div className={'absolute grid grid-cols-2 lg:grid-cols-4 gap-[10px] p-[10px] w-full h-full justify-start  items-start overflow-y-auto bg-dark-theme'} id={'no-scrollbar'}>
                    {images && images.map((image, index) => (
                        <ImageCard key={index} image={image}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ImageRenderer
