import React from 'react'
import {cn} from "@/lib/utils";

const InputField = ({onChange,type,name, value, label,className, placeholder}) => {



    return (
        <div className={`w-full h-fit center container-justify px-[5px]`}>
            <label className={'w-fit !justify-start center capitalize text-nowrap text-black/80 text-sm font-semibold'}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                className={cn(`w-full h-[43px] bd rounded-md text-sm pl-[3px] p-[4px] bg-transparent focus:border-purple-700 focus:shadow focus:shadow-purple-600 outline-none text-black/80`,className)}/>
        </div>
    )
}
export default InputField
