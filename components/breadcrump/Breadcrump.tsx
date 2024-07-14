"use client";

import React, {forwardRef, MouseEventHandler} from "react";
import { cn } from "../../utils/cn";
import {ChevronRight} from "lucide-react";

interface BreadcrumpProps extends React.HTMLAttributes<HTMLDivElement> {
    pastText: string;
    nowText: string;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}

const Breadcrump = forwardRef<HTMLDivElement, BreadcrumpProps>(({ pastText, nowText, onClick, className, ...props }, ref) => (
    <div className={cn("w-max rounded-lg font-normal bg-dark text-marcador flex flex-row items-center text-xs border border-edge p-1",
        className)} ref={ref} {...props}>
        <span className={"cursor-pointer hover:text-white hover:bg-dark-light rounded-md py-1 px-2"} onClick={onClick}>
            {pastText}
        </span>
        <ChevronRight strokeWidth={2} size={15} color={"gray"} className={"mx-1"}/>
        <span className={"text-gray py-1 pl-1.5 pr-2"}>
            {nowText}
        </span>
    </div>
));
Breadcrump.displayName = "Breadcrump";

export {Breadcrump };