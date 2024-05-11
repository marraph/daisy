"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface SkeletonElementProps extends React.HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
}

const SkeletonElement = React.forwardRef<HTMLDivElement, SkeletonElementProps>(({ width, height, className, ...props }, ref) => (
    <div className={cn("bg-dark rounded-full m-2", className)} ref={ref} {...props} style={{width: `${width}px`, height: `${height}px`}}>
    </div>
));
SkeletonElement.displayName = "SkeletonElement";

const SkeletonColumn = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("flex flex-col", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
SkeletonColumn.displayName = "SkeletonColumn";


const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("w-full py-2 px-4 flex flex-row items-center", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
Skeleton.displayName = "Skeleton";

export { Skeleton, SkeletonColumn, SkeletonElement };