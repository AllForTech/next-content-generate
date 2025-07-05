'use client'
import React, {useEffect} from 'react'
import {cn} from "@/lib/utils";
import useTheme from "@/hooks/useTheme";

const ThemeProvider = ({className, children}) => {
    const { isDarkMode} = useTheme()

    // useEffect(() => {
    //         document.getElementById('body').classList.add('')
    // }, [isDarkMode]);


    return (
        <body className={cn(className)}>
           {children}
        </body>
    )
}
export default ThemeProvider
