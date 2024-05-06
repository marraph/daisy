import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const input = cva("w-full bg-black rounded-lg font-semibold border border-white border-opacity-20 outline-none text-base py-2 px-4 text-gray focus:text-white focus:ring-2 focus:ring-placeholder placeholder-placeholder");

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    placeholder: string;
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(({ placeholder, className, ...props }) => (
        <input placeholder={placeholder} className={cn(input({ }), className)} {...props}>
            {props.children}
        </input>
));
Input.displayName = "Input";

export { Input };