"use client";

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string;
    delay: number;
}

type TooltipRef = HTMLDivElement & {
    show: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    hide: () => void;
};

const Tooltip = forwardRef<TooltipRef, TooltipProps>(({ delay, message, className, ...props }, ref) => {
    const [visible, setVisible] = useState<{visible: boolean, x: number, y: number}>({visible: false, x: 0, y: 0});
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (visible.visible) {
            timer = setTimeout(() => {
                setShowTooltip(true);
            }, delay);
        } else {
            setShowTooltip(false);
        }
        return () => clearTimeout(timer);
    }, [visible, delay]);

    const tooltipRef = useRef<TooltipRef>(null);

    useImperativeHandle(ref, () => ({
        show: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            setVisible({visible: true, x: event.clientX, y: event.clientY}),
        hide: () =>
            setVisible({visible: false, x: 0, y: 0}),
        ...tooltipRef.current,
    }));

    return (
        <>
            {showTooltip &&
                <div className={"absolute rounded-lg py-2 px-2 bg-dark text-white z-50"}
                     style={{top: visible.y -40, left: visible.x +10}}>
                    <span className={"items-start"}>{message}</span>
                </div>
            }
        </>
    );
});
Tooltip.displayName = "Tooltip";

export {Tooltip, TooltipRef};