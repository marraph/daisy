import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const progressbar = cva("absolute top-0 left-0 h-full rounded-2xl bg-white");

export interface ProgressbarProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof progressbar> {
    width: number;
    height: number;
    fill: number;
}

export const Progressbar: React.FC<ProgressbarProps> = ({ className, width, height, ...props }) => {
    return (
        <div className={"relative w-full bg-dark rounded-2xl"}
             style={{width: `${width}px`, height: `${height}px`}}>
            <div className={cn(progressbar({ }), className)}{...props} style={{width: `${props.fill}%`}}/>
        </div>
    );
};