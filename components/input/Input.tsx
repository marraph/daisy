"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";
import {cva, VariantProps} from "class-variance-authority";

const input = cva("w-max rounded-lg font-normal text-gray focus:text-white placeholder-placeholder", {
    variants: {
        border: {
            default: ["bg-black", "border", "border-white", "border-opacity-20", "outline-none", "focus:ring-2", "focus:ring-placeholder"],
            none: ["focus-visible:ring-0", "border-0", "bg-black", "focus-visible:outline-none"],
        },
        elementSize: {
            medium: ["text-base", "py-2", "px-4"],
            small: ["text-xs", "py-1", "px-2"],
        },
    },
    defaultVariants: {
        border: "default",
        elementSize: "medium"
    },
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    label?:  string;
    placeholder: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ icon, elementSize, border, label, placeholder, className, ...props }, ref) => (
    <div className={cn("flex flex-col", className)}>
        {label && (
            <p className={cn("text-white font-normal m-1", elementSize === "medium" ? "text-base" : "text-xs", className)}>
                {label}
            </p>
        )}
        <div className={cn("relative flex flex-row items-center", className)}>

            {icon && elementSize === "medium" &&
                <div className={"bg-black p-2.5 rounded-l-lg text-gray"}>
                    {icon}
                </div>
            }

            {icon && elementSize === "small" &&
                <div className={"bg-black p-1.5 rounded-l-lg text-gray"}>
                    {icon}
                </div>
            }

            <input placeholder={placeholder} spellCheck={false} className={cn(input({ border, elementSize }),
                icon && 'rounded-l-none pl-1', className)} ref={ref} {...props}>
            </input>
        </div>
    </div>
));
Input.displayName = "Input";

export { Input };