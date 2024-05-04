import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const tooltip = cva("group rounded-md font-semibold flex flex-col items-start", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            white: ["bg-white", "text-black"],
        },
        size: {
            small: ["p-2", "text-sm"],
            medium: ["p-3", "text-base"],
            large: ["p-4", "text-lg"],
        },
        transparency: {
            default: ["bg-opacity-30"],
            none: [""]
        }
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
        transparency: "none",
    },
});

export interface TooltipProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltip> {
    title?: string;
    description: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, description, theme, size, transparency, className}) => {
    return (
        <div className={cn(tooltip({ theme, size, transparency }), className)}>
            {title != null && (
                <h3 className={theme === "dark" ? "text-white" : "text-black"}>
                    {title}
                </h3>
            )}
            <p className={"font-normal float-left"}>
                {description}
            </p>
        </div>
    );
};