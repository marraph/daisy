"use client";

import React, {forwardRef, InputHTMLAttributes, ReactNode, useImperativeHandle, useRef} from "react";
import { cn } from "../../utils/cn";
import {cva, VariantProps} from "class-variance-authority";

const inputContainer = cva(
    "flex items-center w-full rounded-lg bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray",
    {
        variants: {
            border: {
                default: "border border-zinc-300 dark:border-edge focus-within:border-zinc-500 dark:focus-within:border-white-dark",
                none: "border-0",
            },
            elementSize: {
                small: "text-xs",
                medium: "text-sm",
            },
        },
        defaultVariants: {
            border: "default",
            elementSize: "medium",
        },
    }
);

const input = cva(
    "peer w-full rounded-lg font-normal focus-visible:outline-none focus-visible:ring-0 " +
    "text-zinc-700 dark:text-gray focus:text-zinc-800 dark:focus:text-white " +
    "placeholder-zinc-500 dark:placeholder-marcador bg-transparent",
    {
        variants: {
            border: {
                default: "",
                none: "",
            },
            elementSize: {
                small: "py-1 px-2",
                medium: "py-1.5 px-3",
            },
        },
        defaultVariants: {
            border: "default",
            elementSize: "medium",
        },
    }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputContainer> {
    label?: string;
    placeholder: string;
    icon?: React.ReactNode;
    preSelectedValue?: string | number | null | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onChange, preSelectedValue, icon, elementSize, border, label, placeholder, className, ...props }) => {
    const [inputValue, setInputValue] = React.useState<string | number>(preSelectedValue || "");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange?.(e);
    }

    return (
        <div className="flex flex-col space-y-1">
            {label && (
                <span className="ml-1 text-zinc-400 dark:text-marcador text-xs">
                    {label}
                </span>
            )}

            <div className={cn(inputContainer({border, elementSize}), className)}>
                {icon && (
                    <div className={cn("flex items-center justify-center", elementSize === "medium" ? "p-2 pr-0" : "p-1.5 pr-0")}>
                        {icon}
                    </div>
                )}
                <input
                    className={cn(input({elementSize}))}
                    placeholder={placeholder}
                    spellCheck={false}
                    value={inputValue}
                    onChange={handleOnChange}
                    {...props}
                />
            </div>
        </div>
    );
}

export { Input };