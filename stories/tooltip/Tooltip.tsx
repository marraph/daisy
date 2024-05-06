import React from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";

const tooltip = cva("group w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            success: ["bg-success", "bg-opacity-30", "text-white"],
            warning: ["bg-warning", "bg-opacity-30", "text-white"],
            error: ["bg-error", "bg-opacity-30", "text-white"],
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
        opacity: "none",
    },
});

export interface TooltipProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltip> {
    title?: string;
    description: string;
}


export const Tooltip: React.FC<TooltipProps> = ({ title, description, theme, border, opacity, className}) => {
    return (
        <div className={cn(tooltip({ theme, border, opacity }), className)}>
            <div className={"group rounded-md font-semibold flex flex-col items-start"}>
                {title != null && (
                    <h3 className={theme === "dark" ? "text-white" : "text-black"}>
                        {title}
                    </h3>
                )}
                <p className={"font-normal float-left"}>
                    {description}
                </p>
            </div>
        </div>
    );
};