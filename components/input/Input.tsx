import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label:  string;
    placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, placeholder, className, ...props }, ref) => (
    <div className={cn("flex flex-col", className)}>
        {label && (
            <p className={cn("text-gray text-base m-2", className)}>
                {label}
            </p>
        )}
        <input placeholder={placeholder}
               className={cn("w-full bg-black rounded-lg font-semibold border border-white border-opacity-20 outline-none text-base py-2 px-4 " +
                   "text-gray focus:text-white focus:ring-2 focus:ring-placeholder placeholder-placeholder", className)}
               ref={ref} {...props}>
        </input>
    </div>
));
Input.displayName = "Input";

export {Input};