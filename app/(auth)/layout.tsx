import React from "react";
import {cn} from "@/lib/utils";

export default function Layout({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>){

    return (
        <div className={cn('screen center')}>
            {children}
        </div>
    )
}