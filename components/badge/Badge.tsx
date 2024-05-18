"use client";

import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const badge = cva("w-max flex items-center font-semibold space-x-2", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            primary: ["bg-blue", "text-white"],
            success: ["bg-success", "text-success"],
            warning: ["bg-warning", "text-warning"],
            error: ["bg-error", "text-error"],
            ghost: ["bg-opacity-100", "text-white", "text-opacity-20"],
        },
        border: {
            white: ["border-2", "border-white", "border-opacity-20"],
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
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ theme, border, size, text, className, ...props }, ref) => (
    <div className={cn(badge({theme, border, size}), className)} ref={ref} {...props}>
        {props.children}
        <p>{text}</p>
    </div>
));
Badge.displayName = "Badge";

export { Badge };