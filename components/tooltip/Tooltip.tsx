"use client";

import React, {HTMLAttributes, RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

type TooltipAnchor = "top" | "bottom" | "left" | "right";

interface TooltipProps extends HTMLAttributes<HTMLDivElement>{
    message: string;
    anchor?: TooltipAnchor
    delay?: number;
    color?: string;
    triggerRef: RefObject<HTMLElement>;
}

const Tooltip: React.FC<TooltipProps> = ({ triggerRef, anchor = "right", delay = 1000, color, message, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeout = useRef<number | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const calculatePosition = useCallback(() => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const offset = 8;

        let x: number, y: number;

        switch (anchor) {
            case "top":
                x = triggerRect.width / 2 - tooltipRect.width / 2;
                y = triggerRect.top - offset - tooltipRect.height;
                break;
            case "bottom":
                x = triggerRect.width / 2 - tooltipRect.width / 2;
                y = triggerRect.bottom + offset;
                break;
            case "left":
                x = triggerRect.left - offset - tooltipRect.width;
                y = triggerRect.top / 2 + triggerRect.height / 2;
                break;
            case "right":
                x = triggerRect.right + offset;
                y = triggerRect.top / 2 + triggerRect.height / 2;
                break;
        }

        setPosition({ x, y });
    }, [anchor, triggerRef]);

    useLayoutEffect(() => {
        if (isVisible) {
            calculatePosition();
        }
    }, [isVisible, calculatePosition]);

    useEffect(() => {
        if (delay) {
            timeout.current = window.setTimeout(() => {
                calculatePosition();
                setIsVisible(true);
            }, delay);
        }

        window.addEventListener('resize', calculatePosition);
        window.addEventListener('scroll', calculatePosition);

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
            window.removeEventListener('resize', calculatePosition);
            window.removeEventListener('scroll', calculatePosition);
        }
    }, [delay, triggerRef, tooltipRef, isVisible, calculatePosition]);

    if (!isVisible) return null;
    
    return (
        <div className={"absolute z-50 flex flex-row space-x-1 px-2 py-1 rounded-lg bg-dark border border-edge shadow-lg text-white text-xs"}
             style={{
                 top: position.y,
                 left: position.x,
             }}
             ref={tooltipRef}
        >
            {props.children}
            <span className={"items-start"}>{message}</span>
        </div>
    );
}

export {Tooltip};
export type {TooltipProps, TooltipAnchor};