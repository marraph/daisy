import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";
import {CalendarDays} from "lucide-react";

const navigationItem = cva("group rounded-md font-bold flex flex-row items-start", {
    variants: {
    },
    defaultVariants: {
    },
});

export interface NavigationItemProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof navigationItem> {
    title: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ title, className}) => {
    return (
        <div className={cn(navigationItem({ }), className)}>
            <CalendarDays color={"white"} size={20}/>
            <p className={"ml-4 font-bold"}>
                {title}
            </p>
        </div>
    );
};