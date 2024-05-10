import React from "react";
import { cn } from "../../utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(({ text, className, ...props }) => (
        <div className={cn("group w-full font-normal flex items-center py-2 px-2 text-white", className)} {...props}>
            <input type={"checkbox"} className={cn("w-4 h-4 accent-black border-gray border-opacity-20 rounded-md mr-2 checked:accent-black", className)}/>
            <p>{text}</p>
        </div>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };