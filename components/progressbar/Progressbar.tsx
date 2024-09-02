"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface ProgressbarProps extends React.AreaHTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  fill: number;
}

const Progressbar: React.FC<ProgressbarProps> = ({className, width, height, ...props}) => {
    return (
        <div className={cn("relative w-full bg-dark rounded-2xl", className)}
             style={{ width: `${width}px`, height: `${height}px` }}
        >
            <div className={cn("absolute top-0 left-0 h-full rounded-2xl bg-white", className,)}
                 style={{ width: `${props.fill}%` }}
                 {...props}
            />
        </div>
    );
};

export { Progressbar };
