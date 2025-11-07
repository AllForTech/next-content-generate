'use client';
import React from 'react';
import {cn} from "@/lib/utils";
import {LoaderIcon} from "lucide-react";

type LoaderProps = {
    className?: string;
    text?: string;
    textClassName?: string;
    iconClassName?: string;
    iconSize?: number;
}

export default function Loader({
                                   className,
                                   text = 'Loading...',
                                   iconClassName,
                                   iconSize = 15,
                                   textClassName
}: LoaderProps) {

    return (
        <div className={cn('container-fit gap-2.5 center', className)}>
            <LoaderIcon className={cn('animate-spin transition-300',iconClassName)} size={iconSize}/>
            <span className={cn('text-xs font-medium text-black/80', textClassName)}>{text}</span>
        </div>
    )
}