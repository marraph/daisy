"use client";

import React, {HTMLAttributes} from "react";
import {cn} from "@/utils/cn";

interface SkeletonElementProps extends HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
}

const SkeletonElement: React.FC<SkeletonElementProps> = ({ width, height, className, ...props }) => {
    return (
        <div className={cn("bg-zinc-400 dark:bg-dark-light rounded-full", className)}
             style={{width: `${width}px`, height: `${height}px`}}
             {...props}
        />
    );
}

const SkeletonColumn: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div className={cn("flex flex-col", className)} {...props}>
            {props.children}
        </div>
    );
}


const Skeleton: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div className={cn("w-full flex flex-row items-center animate-pulse", className)} {...props}>
            {props.children}
        </div>
    );
}

export { Skeleton, SkeletonColumn, SkeletonElement };