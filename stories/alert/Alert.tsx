import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const alert = cva("group rounded-md font-semibold flex flex-col items-start", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            ghost: ["bg-black", "bg-opacity-30", "text-gray"],
            success: ["bg-success", "bg-opacity-30", "text-white"],
            warning: ["bg-warning", "bg-opacity-30", "text-white"],
            error: ["bg-error", "bg-opacity-30", "text-white"],
        },
        size: {
            small: ["p-2", "text-sm"],
            medium: ["p-3", "text-base"],
            large: ["p-4", "text-lg"],
        },
        border: {
            default: ["border", "border-white", "border-opacity-20"],
            none: [""]
        }
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
        border: "default",
    },
});

export interface AlertProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof alert> {
    title: string;
    description: string;
}

export const Alert: React.FC<AlertProps> = ({ title, description, theme, size, border, className}) => {

    return (
        <div className={cn(alert({ theme, size, border }), className)}>
            <h3 className={"text-white"}>
                {title}
            </h3>
            <p className={"font-normal float-left"}>
                {description}
            </p>
        </div>
    );
};