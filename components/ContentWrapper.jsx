'use client'
import React, {useRef} from 'react'
import SaveAsPdf from "@/components/saveAsPDF";
import ContentComponent from "@/components/ContentComponent";

const ContentWrapper = ({response}) => {
    const containerRef = useRef(null);

    return (
        <div className={`relative center container-full flex-col text-black p-[10px] !justify-between text-wrap`} id={'no-scrollbar'}>
            {/*<div className="center !justify-between w-full bg-transparent flex-row h-[60px] px-[18px]">*/}
            {/*    <div className={"center w-fit md:space-x-[30px] h-fit !justify-between flex-row"}>*/}
            {/*        <div className={`w-[130px] center h-fit !justify-between z-[4] gap-[10px]`}>*/}
                        <SaveAsPdf contentRef={containerRef}/>
                {/*    </div>*/}
                {/*</div>*/}

            {/*</div>*/}
            <div ref={containerRef} className={`center container-full !w-fit overflow-y-auto p-[10px] bg-white rounded-md`} id={'no-scrollbar'}>
                <ContentComponent contents={response}/>
            </div>
        </div>
    )
}
export default ContentWrapper
