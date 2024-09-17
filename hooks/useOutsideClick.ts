import {useEffect, useRef} from "react";

const useOutsideClick = (callback: (e: MouseEvent | TouchEvent) => void) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            const el = ref?.current
            if (!el || el.contains((e?.target as Node) || null)) {
                return
            }
            handler(e)
        }
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler)

        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        }
    }, [callback]);

    return ref;
};

export {useOutsideClick};