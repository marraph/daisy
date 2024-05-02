import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const checkbox = cva("group w-full rounded-md font-semibold border border-white border-opacity-20 flex items-center py-3 px-3", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
        },
    },
    defaultVariants: {
        theme: "dark",
    },
});

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof checkbox> {}

export const Checkbox: React.FC<CheckboxProps> = ({ theme, className, ...props }) => {
    return (
        <div className={cn(checkbox({ theme }), className)} {...props}>
        </div>
    );
};