import {MutableRefObject, useEffect, useState} from "react";

const useDropdownPosition = (menuRef: MutableRefObject<HTMLDivElement>) => {
    const [position, setPosition] = useState("left");

    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const spaceOnRight = window.innerWidth - rect.right;
            setPosition(spaceOnRight < 300 ? "right" : "left");
        }
    }, [menuRef]);

    return position;
};

export {useDropdownPosition};