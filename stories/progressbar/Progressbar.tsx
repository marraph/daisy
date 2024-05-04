import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const progressbar = cva("absolute top-0 left-0 h-full rounded-2xl", {
    variants: {
        theme: {
            white: ["bg-white"],
            primary: ["bg-blue"],
        },
    },
    defaultVariants: {
        theme: "white",
    },
});

export interface ProgressbarProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof progressbar> {
    width: number;
    height: number;
    fill: number;
}

export const Progressbar: React.FC<ProgressbarProps> = ({ className, theme, width, height, ...props }) => {
    return (
        <div className={"relative w-full bg-black rounded-2xl"}
             style={{width: `${width}px`, height: `${height}px`}}>
            <div className={cn(progressbar({ theme }), className)}{...props} style={{width: `${props.fill}%`}}/>
        </div>
    );
};