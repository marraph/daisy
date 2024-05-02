import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const basecard = cva("group w-full rounded-md font-semibold border border-white border-opacity-20 flex items-center py-3 px-3", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
        },
    },
    defaultVariants: {
        theme: "dark",
    },
});

export interface BasecardpProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof basecard> {}

export const Basecard: React.FC<BasecardpProps> = ({ theme, className, ...props }) => {
    return (
        <div className={cn(basecard({ theme }), className)} {...props}>
        </div>
    );
};