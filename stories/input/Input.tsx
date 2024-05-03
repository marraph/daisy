import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const input = cva("w-full rounded-md font-semibold border border-white border-opacity-20", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray", "focus:text-white", "placeholder-placeholder"],
            primary: ["bg-blue", "text-white"],
        },
        field_size: {
            small: ["text-sm", "py-1", "px-2"],
            medium: ["text-base", "py-2", "px-4"],
            large: ["text-lg", "py-2", "px-5"],
        },
    },
    defaultVariants: {
        theme: "dark",
        field_size: "medium",
    },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    placeholder: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, className, theme, field_size, ...props }) => {
    return (
        <input placeholder={placeholder} className={cn(input({ theme, field_size }), className)} {...props}>
            {props.children}
        </input>
    );
};