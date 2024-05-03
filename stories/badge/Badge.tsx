import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const badge = cva("group w-full rounded-md font-semibold", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            primary: ["bg-blue", "text-white"],
            success: ["bg-success", "text-success"],
            warning: ["bg-warning", "text-warning"],
            error: ["bg-error", "text-error"],
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
        }
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
        opacity: "medium"
    },
});

export interface BadgeProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof badge> {
    text: string;
    icon_url?: string;
}

export const Badge: React.FC<BadgeProps> = ({ className, theme, size, opacity, text, icon_url, ...props }) => {
    return (
        <div className={cn(badge({ theme, size, opacity }), className)} {...props}>
            <div className="flex items-center">
                {icon_url && (
                <svg className={"mr-2"} xmlns="http://www.w3.org/2000/svg" y="0px" width="20" height="20" viewBox="0,0,30,30">
                  <path d={ icon_url } className={theme === 'dark' ? "fill-gray" : "fill-white"}/>
                </svg>
                )}
                <p>{text}</p>
            </div>
        </div>
    );
};