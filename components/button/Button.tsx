"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, {forwardRef, ReactNode} from "react";
import { cn } from "../../utils/cn";

const button = cva("w-max rounded-lg font-medium text-sm py-2 px-4 flex items-center disabled:cursor-not-allowed disabled:hover:none disabled:border-none", {
      variants: {
        theme: {
          default: "bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray hover:text-zinc-800 dark:hover:text-white " +
                   "hover:bg-zinc-200 dark:hover:bg-dark-light border border-zinc-300 dark:border-edge disabled:text-zinc-500 " +
                   "dark:disabled:text-marcador disabled:bg-zinc-400 dark:disabled:bg-dark-light",
          primary: "bg-zinc-800 dark:bg-zinc-100 text-zinc-200 dark:text-dark hover:text-white dark:hover:text-black " +
                   "hover:bg-zinc-900 dark:hover:bg-zinc-200 border border-zinc-700 dark:border-white disabled:text-marcador " +
                   "dark:disabled:text-zinc-500 disabled:bg-dark-light dark:disabled:bg-zinc-400",
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
}

const Button: React.FC<ButtonProps> = ({ icon, theme, size, text, className, ...props }) => {
    return (
        <button className={cn(button({theme, size}), className)} {...props}>
            {icon && icon}
            {text}
        </button>
    );
}

export { Button };