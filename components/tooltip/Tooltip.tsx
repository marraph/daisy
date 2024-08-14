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
    trigger: DOMRect;
}

const Tooltip: React.FC<TooltipProps> = ({ anchor = "right", delay = 1000, color, message, offset = 8, shortcut, trigger, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeout = useRef<number | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const calculatePosition = useCallback(() => {
        if (!tooltipRef.current) return;
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let x: number, y: number;

        switch (anchor) {
            case "top":
                x = trigger.width / 2 - tooltipRect.width / 2;
                y = trigger.top - offset - tooltipRect.height;
                break;
            case "bottom":
                x = trigger.width / 2 - tooltipRect.width / 2;
                y = trigger.bottom + offset;
                break;
            case "left":
                x = trigger.left - offset - tooltipRect.width;
                y = trigger.top / 2 + trigger.height / 2;
                break;
            case "right":
                x = trigger.right + offset;
                y = trigger.top / 2 + trigger.height / 2;
                break;
            default:
                x = trigger.left;
                y = trigger.top;
        }

        setPosition({ x, y });
    }, [anchor, offset, trigger.bottom, trigger.height, trigger.left, trigger.right, trigger.top, trigger.width]);

    useLayoutEffect(() => {
        if (isVisible) {
            calculatePosition();
        }
    }, [isVisible, calculatePosition, trigger]);


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