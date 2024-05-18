"use client";

import React, {forwardRef, MouseEventHandler} from "react";
import { cn } from "../../utils/cn";
import {ChevronRight} from "lucide-react";

interface BreadcrumpProps extends React.HTMLAttributes<HTMLDivElement> {
    pastText?: string;
    nowText?: string;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}

const Breadcrump = forwardRef<HTMLDivElement, BreadcrumpProps>(({ pastText, nowText, onClick, className, ...props }, ref) => (
    <div className={cn("w-max rounded-lg font-normal bg-opacity-20 bg-black text-placeholder " +
        "flex flex-row items-center text-xs border border-white border-opacity-20 px-2 py-1", className)}
         ref={ref} {...props}>
        <span className={cn("cursor-pointer hover:text-white hover:bg-selected rounded-md p-1")}
        onClick={onClick}>
            {pastText}
        </span>
        <ChevronRight strokeWidth={2} size={15} color={"gray"} className={"mx-2"}/>
        <span className={cn("text-gray")}>
            {nowText}
        </span>
    </div>
));
Breadcrump.displayName = "Breadcrump";

export {Breadcrump };