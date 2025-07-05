'use client'
import React, {useEffect, useLayoutEffect, useState} from 'react'

const UseTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [dark, setDark] = useState('')

    const toggleTheme = () => {
        const  htmlElement = document.getElementById('body')
        if(dark && htmlElement){
            htmlElement.classList.remove('dark')
            setIsDarkMode(false)
            setDark('')
        }else {
            htmlElement.classList.add('dark')
            setDark('dark')
            setIsDarkMode(true)
        }

        if(htmlElement.classList.contains('dark')){
            localStorage.setItem('theme', 'dark')
            setIsDarkMode(true)
        }else {
            localStorage.removeItem('theme')
            setIsDarkMode(false)
        }
    }

    useEffect(() => {
        const  htmlElement = document.getElementById('body')
        if(typeof window !== 'undefined'){

            const theme = window.localStorage.getItem('theme')

            // setDark(theme)
            if( theme === "dark"){
                htmlElement.classList.add('dark')
                setIsDarkMode(true)
            }else{
                setIsDarkMode(false)
            }
        }
    }, []);

    return {
        isDarkMode,
        toggleTheme
    }
}
export default UseTheme
