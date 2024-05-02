import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const alert = cva("group rounded-md font-semibold border border-white border-opacity-20 py-3 px-3", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            success: ["bg-success", "bg-opacity-30", "text-white"],
            warning: ["bg-warning", "bg-opacity-30", "text-white"],
            error: ["bg-error", "bg-opacity-30", "text-white"],
        },
        size: {
            small: ["w-[15rem]", "text-xs"],
            medium: ["w-[22rem]", "text-sm"],
            large: ["w-[30rem]", "text-base"],
        },
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
    },
});

export interface AlertProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof alert> {
    title: string;
    description: string;
    icon_url?: string;
}

export const Alert: React.FC<AlertProps> = ({ title, description, icon_url, theme, size, className}) => {
    return (
        <div className={cn(alert({ theme, size }), className)}>
            <div className={"flex items-center"}>
                {icon_url && (
                    <span className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,30,30">
                            <path d={ icon_url } className={"fill-white"}/>
                        </svg>
                    </span>
                )}
                <div className={"flex flex-col items-start"}>
                    <h3 className={'${titleClass} text-white'}>
                        {title}
                    </h3>
                    <p className={"font-normal float-left"}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};