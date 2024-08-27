import React, {useCallback, useRef, useState} from "react";

export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, visible: false });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target instanceof HTMLButtonElement || e.target instanceof SVGElement) {
            const buttonElement = e.currentTarget;
            const rect = buttonElement.getBoundingClientRect();

            const coordinates = {
                x: rect.left - 52,
                y: rect.top + 34
            };
            setContextMenu({ x: coordinates.x, y: coordinates.y, visible: true });
        } else {
            setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
        }
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu({ x: 0, y: 0, visible: false });
    }, []);

    return { contextMenu, handleContextMenu, closeContextMenu, dropdownRef };
};