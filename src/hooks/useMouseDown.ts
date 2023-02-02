import { useEffect, useState } from "react"


const useMouseDown = () => {

    const [mouseUpDown, setMouseUpDown] = useState<boolean>(false);

    useEffect(() => {

        const _handleMouseDown = (e: MouseEvent) => {
            setMouseUpDown(true);
        };

        const _handleMouseUp = (e: MouseEvent) => {
            setMouseUpDown(false);
        };

        window.addEventListener("mousedown", _handleMouseDown);
        window.addEventListener("mouseup", _handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", _handleMouseDown);
            window.removeEventListener("mouseup", _handleMouseUp);
        };

    }, []);

    return mouseUpDown;
}

export default useMouseDown;