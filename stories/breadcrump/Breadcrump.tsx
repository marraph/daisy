import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";
import {ChevronRight} from "lucide-react";

const breadcrump = cva("group w-full rounded-md font-semibold bg-opacity-20 bg-black text-placeholder flex items-center", {
    variants: {
        size: {
            small: ["text-xs", "py-1", "px-3"],
            medium: ["text-sm", "py-2", "px-4"],
            large: ["text-base", "py-3", "px-5"],
        },
        border: {
            default: ["border", "border-white", "border-opacity-20"],
            none: [""],
        },
    },
    defaultVariants: {
        size: "medium",
        border: "none",
    },
});

export interface BreadcrumpProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof breadcrump> {
    firstText: string;
    secondText: string;
}

export const Breadcrump: React.FC<BreadcrumpProps> = ({ size, border, firstText, secondText, className, ...props }) => {
    return (
        <div className={cn(breadcrump({ size, border }), className)} {...props}>
            <p className={"cursor-pointer hover:text-white hover:underline"}>{firstText}</p>
            <ChevronRight strokeWidth={4} size={15} color={"gray"} className={"m-2"}/>
            <p className={"text-gray"}>{secondText}</p>
        </div>
    );
};