import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const checkbox = cva("group w-full font-semibold flex items-center py-2 px-2", {
    variants: {
        text_color: {
            gray: ["text-gray"],
            white: ["text-white"],
        },
    },
    defaultVariants: {
        text_color: "white",
    },
});

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof checkbox> {
    text: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ text_color, text, className, ...props }) => {
    return (
        <div className={cn(checkbox({ text_color }), className)} {...props}>
            <input type={"checkbox"} className={"w-4 h-4 accent-black border-gray border-opacity-20 rounded-md mr-2 checked:accent-black hover:border-black"}/>
            <p>{text}</p>
        </div>
    );
};