"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?:  string;
    placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, placeholder, className, ...props }, ref) => (
    <div className={cn("group flex flex-col", className)}>
        {label && (
            <p className={cn("text-white text-base font-normal m-1", className)}>
                {label}
            </p>
        )}
        <div className={cn("relative", className)}>
            <input placeholder={placeholder}
                   className={cn("w-full bg-black rounded-lg font-normal border border-white border-opacity-20 outline-none text-base py-2 px-4 " +
                       "text-gray focus:text-white focus:ring-2 focus:ring-placeholder placeholder-placeholder", className)}
                   ref={ref} {...props}>
            </input>
        </div>
    </div>
));
Input.displayName = "Input";

export { Input };