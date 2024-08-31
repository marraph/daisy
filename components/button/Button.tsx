"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, {forwardRef, ReactNode} from "react";
import { cn } from "../../utils/cn";

const button = cva("w-max relative rounded-lg font-medium text-sm py-2 px-4 flex items-center disabled:cursor-not-allowed disabled:hover:none", {
      variants: {
        theme: {
          default: "bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray hover:text-zinc-800 dark:hover:text-white " +
                   "hover:bg-zinc-200 dark:hover:bg-dark-light border border-zinc-300 dark:border-edge disabled:text-zinc-400 " +
                   "dark:disabled:text-marcador disabled:bg-zinc-300 dark:disabled:bg-dark-light disabled:border-zinc-300 dark:disabled:border-dark-light",
          primary: "bg-zinc-800 dark:bg-zinc-100 text-zinc-200 dark:text-dark hover:text-white dark:hover:text-black " +
                   "hover:bg-zinc-900 dark:hover:bg-zinc-200 border border-zinc-700 dark:border-white disabled:text-marcador " +
                   "dark:disabled:text-zinc-500 disabled:bg-dark-light dark:disabled:bg-zinc-400 disabled:border-dark-light dark:disabled:border-zinc-400",
        },
        size: {
          small: ["text-xs", "py-1", "px-2"],
          medium: ["text-sm", "py-1.5", "px-3"],
        },
      },
      defaultVariants: {
        theme: "default",
        size: "medium",
      },
    });

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
    text: string;
    icon?: ReactNode;
    isLoading?: boolean;
}

const ButtonSpinner: React.FC<{ size?: "small" | "medium", theme?: "primary" | "default" }> = ({ size = "medium", theme = "default" }) => (
    <svg
        className={cn("animate-spin text-zinc-800 dark:text-white mr-2",
            size === "small" ? "h-3 w-3" : "h-4 w-4",
            theme === "primary" ? "text-white dark:text-zinc-800" : "text-zinc-800 dark:text-white"
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ icon, isLoading, theme, size, text, className, ...props }, ref) => {
    return (
        <button className={cn(button({theme, size}), className)}
                disabled={isLoading || props.disabled}
                ref={ref}
                {...props}
        >
            {isLoading ?
                <ButtonSpinner size={size} theme={theme}/>
                :
                <div className={cn({"mr-2": icon && text.trim() !== ""})}>
                    {icon}
                </div>
            }
            <span>{text}</span>
        </button>
    );
});

export {Button};