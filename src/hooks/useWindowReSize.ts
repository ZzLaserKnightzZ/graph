import { useEffect, useState } from "react"


const useWindowReSize = () => {

    const [size, setSize] = useState<{width:number; height: number;}>();

    useEffect(() => {
        const _handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        _handleResize();

        window.addEventListener("resize", _handleResize);

        return () => window.removeEventListener("resize", _handleResize);

    }, []);

    return size;
}

export default useWindowReSize;






