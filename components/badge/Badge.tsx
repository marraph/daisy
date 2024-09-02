"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const badge = cva("w-max flex items-center font-semibold space-x-2", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            white: ["bg-white", "text-dark"],
        },
        border: {
            white: ["border-2", "border-edge"],
            none: [""],
        },
        size: {
            small: ["text-xs", "px-1", "py-1"],
            medium: ["text-sm", "px-2", "py-1"],
            large: ["text-base", "px-3", "py-2"],
        },
    },
    defaultVariants: {
        theme: "dark",
        border: "none",
        size: "medium",
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badge> {
    text: string;
    textClassName?: string;
}

const Badge: React.FC<BadgeProps> = ({ theme, border, size, text, textClassName, className, ...props }) => {
    return (
        <div className={cn(badge({theme, border, size}), className)} {...props}>
            {props.children}
            <span className={textClassName}>{text}</span>
        </div>
    );
}

export { Badge };