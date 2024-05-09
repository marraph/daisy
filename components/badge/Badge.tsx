import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const badge = cva("group w-full flex items-center font-medium py-2 px-4", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            primary: ["bg-blue", "text-white"],
            success: ["bg-success", "text-success"],
            warning: ["bg-warning", "text-warning"],
            error: ["bg-error", "text-error"],
            ghost: ["bg-opacity-100", "text-white", "text-opacity-20"],
        },
        opacity: {
            light: "bg-opacity-20",
            medium: "bg-opacity-40",
            base: "bg-opacity-60",
            hard: "bg-opacity-80",
            full: "bg-opacity-100",
        },
        border: {
            white: ["border-2", "border-white", "border-opacity-20"],
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
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badge> {
    text: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ theme, opacity, border, roundness, text, className, ...props }, ref) => (
    <div className={cn(badge({theme, opacity, border, roundness}), className)} ref={ref} {...props}>
        <p>{text}</p>
    </div>
));
Badge.displayName = "Badge";

export { Badge };