"use client";

import React, {useRef, useState} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string;
    delay: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({ delay, message, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseOver = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const handleMouseOut = () => {
        clearTimeout(timeoutRef.current);
        setVisible(false);
    };

    return (
        <div className={"inline-block relative bg-warning"}
             ref={ref} {...props}
             onMouseOver={handleMouseOver}
             onMouseOut={handleMouseOut}
        >
            {visible &&
                <div className={"rounded-lg py-2 px-2 bg-gray text-white"}>
                    <span className={"items-start"}>{message}</span>
                </div>
            }
        </div>
    );
});
Tooltip.displayName = "Tooltip";

export {Tooltip};