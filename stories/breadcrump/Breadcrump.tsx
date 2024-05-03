import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";
import {ChevronRight} from "lucide-react";

const breadcrump = cva("group w-full rounded-md font-semibold bg-opacity-20 bg-black text-gray flex items-center py-1 px-4", {
    variants: {},
});

export interface BreadcrumpProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof breadcrump> {
    firstText: string;
    secondText: string;
}

export const Breadcrump: React.FC<BreadcrumpProps> = ({ firstText, secondText, className, ...props }) => {
    return (
        <div className={cn(breadcrump({}), className)} {...props}>
            <p className={"hover:text-white hover:underline"}>{firstText}</p>
            <ChevronRight strokeWidth={4} size={15} color={"gray"} className={"m-2"}/>
            <p className={"text-white"}>{secondText}</p>
        </div>
    );
};