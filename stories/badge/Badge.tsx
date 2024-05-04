import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const badge = cva("group w-full flex items-center font-semibold", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            primary: ["bg-blue", "text-white"],
            success: ["bg-success", "text-success"],
            warning: ["bg-warning", "text-warning"],
            error: ["bg-error", "text-error"],
            ghost: ["bg-opacity-100", "text-white", "text-opacity-20"],
        },
        size: {
            small: ["text-sm", "py-1", "px-4"],
            medium: ["text-base", "py-1", "px-4"],
            large: ["text-lg", "py-1", "px-4"],
        },
        opacity: {
            light: "bg-opacity-20",
            medium: "bg-opacity-40",
            base: "bg-opacity-60",
            hard: "bg-opacity-80",
            full: "bg-opacity-100",
        },
        border: {
            default: ["border", "border-white", "border-opacity-20", "border-2"],
            none: [""],
        },
        roundness: {
            full: "rounded-full",
            ultra: "rounded-2xl",
            super: "rounded-xl",
            large: "rounded-lg",
            medium: "rounded-md",
            small: "rounded-sm",
        }
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
});

export interface BadgeProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof badge> {
    text: string;
}

export const Badge: React.FC<BadgeProps> = ({ className, theme, size, opacity, border, roundness, text, ...props }) => {
    return (
        <div className={cn(badge({ theme, size, opacity, border, roundness }), className)} {...props}>
            <p>{text}</p>
        </div>
    );
};