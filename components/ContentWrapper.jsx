'use client'
import React, {useRef} from 'react'
import SaveAsPdf from "@/components/saveAsPDF";
import ContentComponent from "@/components/ContentComponent";

const ContentWrapper = ({response}) => {
    const containerRef = useRef(null);

    return (
        <div className={`relative center container-full flex-col text-black p-[10px] !justify-between text-wrap`} id={'no-scrollbar'}>
                        <SaveAsPdf contentRef={containerRef}/>

            <div ref={containerRef} className={`center container-full !w-fit overflow-y-auto p-[10px] bg-white rounded-md`} id={'no-scrollbar'}>
                <ContentComponent contents={response}/>
            </div>
        </div>
    )
}
export default ContentWrapper
