import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";
import {ChevronRight} from "lucide-react";

const breadcrump = cva("group w-full rounded-lg font-normal bg-opacity-20 bg-black text-placeholder flex items-center text-sm py-1 px-4 " +
    "border border-white border-opacity-20");

interface BreadcrumpProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof breadcrump> {
    pastText?: string;
    nowText?: string;
}

const BreadcrumpPastItem = React.forwardRef<HTMLDivElement, BreadcrumpProps>(({ pastText, className, ...props }, ref) => (
    <div className={cn("cursor-pointer hover:text-white hover:underline", className)} ref={ref} {...props}>
        {pastText}
    </div>
));
BreadcrumpPastItem.displayName = "BreadcrumpPastItem";


const BreadcrumpNowItem = React.forwardRef<HTMLDivElement, BreadcrumpProps>(({ nowText, className, ...props }, ref) => (
    <div className={cn("text-gray", className)} ref={ref} {...props}>
        {nowText}
    </div>
));
BreadcrumpNowItem.displayName = "BreadcrumpNowItem";


const Breadcrump = React.forwardRef<HTMLDivElement, BreadcrumpProps>(({ pastText, nowText, ...props }, ref) => (
    <div className={cn(breadcrump({ }))} ref={ref} {...props}>
        <BreadcrumpPastItem pastText={pastText} className={cn("cursor-pointer hover:text-white hover:underline")} />
        <ChevronRight strokeWidth={4} size={15} color={"gray"} className={"m-2"}/>
        <BreadcrumpNowItem nowText={nowText} className={"text-gray"} />
    </div>
));
Breadcrump.displayName = "Breadcrump";

export { Breadcrump, BreadcrumpPastItem, BreadcrumpNowItem };