"use client";

import React, {forwardRef, MouseEventHandler} from "react";
import { cn } from "../../utils/cn";
import {ChevronRight} from "lucide-react";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
    pastText: string;
    nowText: string;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pastText, nowText, onClick, className, ...props }) => {
    return (
        <div className={cn("w-max flex flex-row items-center rounded-lg font-normal text-xs px-1 py-0.5 border " +
            "bg-zinc-200 dark:bg-dark text-zinc-400 dark:text-marcador border-zinc-300 dark:border-edge", className)}
             {...props}
        >
        <span className={"cursor-pointer hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-dark-light rounded-md py-1 px-2"}
              onClick={onClick}
        >
            {pastText}
        </span>
            <ChevronRight strokeWidth={2} size={15} className={"text-zinc-700 mx-1"}/>
            <span className={"text-zinc-700 py-1 pl-1.5 pr-2"}>
            {nowText}
        </span>
        </div>
    );
}

export { Breadcrumb };