import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {cn} from "../../utils/cn";

const seperator = cva("relative border", {
    variants: {
        border_color: {
            white: ["border-white", "border-opacity-20"],
        },
    },
    defaultVariants: {
        border_color: "white",
    },
});

export interface SeperatorProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof seperator> {}

export const Seperator: React.FC<SeperatorProps> = ({ border_color, className, ...props }) => {
    return (
        <div className={cn(seperator({ border_color }), className)} {...props}>
        </div>
    );
};