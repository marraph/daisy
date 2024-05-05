import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const basecard = cva("group w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            success: ["bg-success", "bg-opacity-30", "text-white"],
            warning: ["bg-warning", "bg-opacity-30", "text-white"],
            error: ["bg-error", "bg-opacity-30", "text-white"],
        },
        size: {
            small: ["text-sm"],
            medium: ["text-base"],
            large: ["text-lg"],
        },
        border: {
            default: ["border", "border-white", "border-opacity-20"],
            none: [""]
        },
        opacity: {
            default: ["bg-opacity-30"],
            none: [""],
        }
    },
    defaultVariants: {
        theme: "dark",
        border: "default",
    },
});

export interface BasecardProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof basecard> {}

export const Basecard: React.FC<BasecardProps> = ({ theme, border, size, opacity, className, ...props }) => {
    return (
        <div className={cn(basecard({ theme, border, size, opacity }), className)} {...props}></div>
    );
};