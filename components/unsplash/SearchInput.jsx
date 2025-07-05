'use client'
import React, {useState} from 'react'
import {cn} from "@/lib/utils";
import {SearchIcon} from "lucide-react";

const SearchInput = () => {
    const [query, setQuery] = useState('')

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = async (e)=> {
        if(e.key === 'Enter' && query.trim()){
            console.log(e.key)
        }
        console.log(query)
    }

    return (
        <div className={cn(`w-full h-[60px] relative mt-[20px] mb-[10px] center p-[5px]`)}>
            <input
                type={'text'}
                onChange={handleChange}
                inputMode={'text'}
                value={query}
                placeholder={'search...'}
                onClick={handleSearch}
                className={'w-full border-1 border-zinc-600 dark:border-zinc-500 rounded-full outline-none h-[40px] text-xs p-[10px] transition-400 bg-transparent dark:text-white text-black font-normal'}/>
            <div
                onClick={handleSearch}
                className={'size-[30px] rounded-full button-dark center absolute right-[10px] top-[50%] -translate-y-[50%]'}>
                <SearchIcon size={15}/>
            </div>
        </div>
    )
}
export default SearchInput
