import { useEffect, useState } from "react"


const useMousePosition = () => {

    const [mouseMove, setMouseMove] = useState<{ x: number; y: number; }>({x:0,y:0});

    useEffect(() => {

        const _handleMouseMove = (e: MouseEvent) => {
            setMouseMove({ x: e.pageX, y: e.pageY });
        };

        window.addEventListener("mousemove", _handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", _handleMouseMove);
        };

    }, []);

    return mouseMove;
}

export default useMousePosition;