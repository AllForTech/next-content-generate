'use client'
import React from 'react'
import { useReactToPrint } from "react-to-print";

const SaveAsPdf = ({contentRef}) => {

            const print = useReactToPrint({contentRef})


    return (
        <div className={`container-fit absolute -top-[50px] right-[70px] hover:bg-purple-950 transition-all duration-300 cursor-pointer button-accent !shadow-none !rounded-md h-[40px] gap-[5px] text-xs text-white text-nowrap center flex-row`} onClick={print}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160v212q-19-8-39.5-10.5t-40.5.5v-169L647-760H200v560h240v80H200Zm0-640v560-560ZM520-40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-260L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM240-560h360v-160H240v160Zm240 320h4l116-115v-5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>
        </div>
    )
}
export default SaveAsPdf
