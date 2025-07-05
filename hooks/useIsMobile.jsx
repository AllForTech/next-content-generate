import React, {useEffect, useState} from 'react'

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined") {

            const handleResize = (e) => {
                if(e.currentTarget.innerWidth < 800){
                    setIsMobile(true);
                }else {
                    setIsMobile(false)
                }
            };

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return {
        isMobile
    }
}
export default useIsMobile
