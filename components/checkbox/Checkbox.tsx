"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ text, className, ...props }, ref) => (
        <div className={cn("w-max font-normal flex items-center p-2 text-white", className)} {...props}>
            <input type={"checkbox"} ref={ref}
                   className={cn("size-4 accent-black border-gray border-opacity-20 " +
                       "rounded-md mr-2 checked:accent-black", className)}/>
            <p>{text}</p>
        </div>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };