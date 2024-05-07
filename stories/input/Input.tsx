import React from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ placeholder, className, ...props }, ref) => (
        <input placeholder={placeholder} className={cn("w-full bg-black rounded-lg font-semibold border border-white border-opacity-20 outline-none text-base py-2 px-4 " +
            "text-gray focus:text-white focus:ring-2 focus:ring-placeholder placeholder-placeholder", className)} ref={ref} {...props}>
            {props.children}
        </input>
));
Input.displayName = "Input";

export { Input };