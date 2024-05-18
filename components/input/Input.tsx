"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";
import {cva, VariantProps} from "class-variance-authority";

const input = cva("w-max rounded-lg font-normal text-base py-2 px-4 text-gray focus:text-white placeholder-placeholder", {
    variants: {
        border: {
            default: ["bg-black", "border", "border-white", "border-opacity-20", "outline-none", "focus:ring-2", "focus:ring-placeholder"],
            none: ["focus-visible:ring-0", "border-0", "bg-black", "focus-visible:outline-none"],
        },
    },
    defaultVariants: {
        border: "default",
    },
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    label?:  string;
    placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ border, label, placeholder, className, ...props }, ref) => (
    <div className={cn("flex flex-col", className)}>
        {label && (
            <p className={cn("text-white text-base font-normal m-1", className)}>
                {label}
            </p>
        )}
        <div className={cn("relative", className)}>
            <input placeholder={placeholder} spellCheck={false} className={cn(input({ border }), className)}
                   ref={ref} {...props}>
            </input>
        </div>
    </div>
));
Input.displayName = "Input";

export { Input };