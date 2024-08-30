"use client";

import React, {HTMLAttributes, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

type TooltipAnchor = "tl" | "tc" | "tr" | "bl" | "bc" | "br" | "lt" | "lc" | "lb" | "rt" | "rc" | "rb"

interface TooltipProps extends HTMLAttributes<HTMLDivElement>{
    message: string;
    trigger: DOMRect;
    icon?: ReactNode;
    anchor?: TooltipAnchor
    delay?: number;
    color?: string;
    offset?: number;
    shortcut?: string;
    customTooltip?: ReactNode;
}

const Tooltip: React.FC<TooltipProps & { lastTooltipTimestamp: number | null }> = ({ anchor = "rc", delay = 1000, icon, color, message, offset = 8, shortcut, trigger, lastTooltipTimestamp,customTooltip, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeout = useRef<number | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const calculatePosition = useCallback(() => {
        if (!tooltipRef.current) return;
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let x: number, y: number;

        switch (anchor) {
            //Top
            case "tl":
                x = trigger.left;
                y = trigger.top - offset - tooltipRect.height;
                break;
            case "tc":
                x = trigger.left + (trigger.width / 2) - (tooltipRect.width / 2);
                y = trigger.top - offset - tooltipRect.height;
                break;
            case "tr":
                x = trigger.right - tooltipRect.width;
                y = trigger.top - offset - tooltipRect.height;
                break;

            // Bottom
            case "bl":
                x = trigger.left;
                y = trigger.bottom + offset;
                break;
            case "bc":
                x = trigger.left + (trigger.width / 2) - (tooltipRect.width / 2);
                y = trigger.bottom + offset;
                break;
            case "br":
                x = trigger.right - tooltipRect.width;
                y = trigger.bottom + offset;
                break;

            // Left
            case "lt":
                x = trigger.left - offset - tooltipRect.width;
                y = trigger.top;
                break;
            case "lc":
                x = trigger.left - offset - tooltipRect.width;
                y = trigger.top + (trigger.height / 2) - (tooltipRect.height / 2);
                break;
            case "lb":
                x = trigger.left - offset - tooltipRect.width;
                y = trigger.bottom - tooltipRect.height;
                break;

            // Right
            case "rt":
                x = trigger.right + offset;
                y = trigger.top;
                break;
            case "rc":
                x = trigger.right + offset;
                y = trigger.top + (trigger.height / 2) - (tooltipRect.height / 2);
                break;
            case "rb":
                x = trigger.right + offset;
                y = trigger.bottom - tooltipRect.height;
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
        const currentTimestamp = Date.now();
        const lastTooltipVisible = lastTooltipTimestamp !== null && currentTimestamp - lastTooltipTimestamp < 500;

        if (delay) {
            if (lastTooltipVisible) {
                calculatePosition();
                setIsVisible(true);
            } else {
                timeout.current = window.setTimeout(() => {
                    calculatePosition();
                    setIsVisible(true);
                }, delay);
            }
        } else {
            if (timeout.current) clearTimeout(timeout.current);
        }

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
            window.removeEventListener('resize', calculatePosition);
            window.removeEventListener('scroll', calculatePosition);
        };
    }, [delay, trigger, tooltipRef, isVisible, calculatePosition, lastTooltipTimestamp]);

    return (
        <>
            {isVisible && (
                <div
                    className={"absolute z-50 w-max flex flex-row space-x-4 items-center px-2 py-1 rounded-lg shadow-lg text-xs dark:text-xs font-normal " +
                        "bg-zinc-100 dark:bg-dark border border-zinc-300 dark:border-edge"
                    }
                    style={{
                        top: position.y,
                        left: position.x,
                    }}
                    ref={tooltipRef}
                >
                    {customTooltip ?
                        customTooltip
                        :
                        <>
                            <div className={"flex flex-row space-x-2 items-center text-xs dark:text-xs text-zinc-800 dark:text-white"}>
                                {icon}
                                <span>{message}</span>
                            </div>
                            {shortcut &&
                                <span className={"px-1 rounded-sm bg-zinc-200 dark:bg-dark-light text-zinc-600 dark:text-gray"}>{shortcut}</span>
                            }
                        </>
                    }
                </div>
            )}
        </>
    );
};

export {Tooltip};
export type {TooltipProps, TooltipAnchor};