"use client";

import React, {HTMLAttributes, RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

type TooltipAnchor = "top" | "bottom" | "left" | "right";

interface TooltipProps extends HTMLAttributes<HTMLDivElement>{
    message: string;
    anchor?: TooltipAnchor
    delay?: number;
    color?: string;
    offset?: number;
    shortcut?: string;
    trigger: RefObject<HTMLElement>;
}

const Tooltip: React.FC<TooltipProps> = ({ anchor = "right", delay = 1000, color, message, offset = 8, shortcut, trigger, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeout = useRef<number | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const calculatePosition = useCallback((triggerElement: HTMLElement) => {
        if (!triggerElement || !tooltipRef.current) return;

        const triggerRect = triggerElement.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

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
            default:
                x = triggerRect.left;
                y = triggerRect.top;
        }

        setPosition({ x, y });
    }, [anchor, offset]);

    useLayoutEffect(() => {
        if (isVisible && trigger?.current) {
            calculatePosition(trigger.current);
        }
    }, [isVisible, calculatePosition, trigger]);


    useEffect(() => {
        if (delay && trigger?.current) {
            timeout.current = window.setTimeout(() => {
                calculatePosition(trigger.current!);
                setIsVisible(true);
            }, delay);
        }

        const handleResizeOrScroll = () => {
            if (trigger?.current) {
                calculatePosition(trigger.current);
            }
        };

        window.addEventListener('resize', handleResizeOrScroll);
        window.addEventListener('scroll', handleResizeOrScroll);

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
            window.removeEventListener('resize', handleResizeOrScroll);
            window.removeEventListener('scroll', handleResizeOrScroll);
        };
    }, [delay, trigger, tooltipRef, isVisible, calculatePosition]);

    return (
        <>
            {isVisible && (
                <div
                    className={"isolate absolute z-50 flex flex-row space-x-4 items-center px-2 py-1 rounded-lg shadow-lg text-xs dark:text-xs font-normal " +
                        "bg-zinc-100 dark:bg-dark border border-zinc-300 dark:border-edge text-zinc-800 dark:text-white"
                    }
                    style={{
                        top: position.y,
                        left: position.x,
                    }}
                    ref={tooltipRef}
                >
                    <span>{message}</span>
                    {shortcut &&
                        <span className={"text-zinc-600 dark:text-gray"}>{shortcut}</span>
                    }
                </div>
            )}
        </>
    );
};

export {Tooltip};
export type {TooltipProps, TooltipAnchor};