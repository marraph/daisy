"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";

interface SkeletonElementProps extends React.HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
}

const SkeletonElement = forwardRef<HTMLDivElement, SkeletonElementProps>(({ width, height, className, ...props }, ref) => (
    <div className={cn("bg-dark-light rounded-full", className)} ref={ref} {...props} style={{width: `${width}px`, height: `${height}px`}}>
    </div>
));
SkeletonElement.displayName = "SkeletonElement";

const SkeletonColumn = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("flex flex-col", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
SkeletonColumn.displayName = "SkeletonColumn";


const Skeleton = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("w-full flex flex-row items-center animate-pulse", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
Skeleton.displayName = "Skeleton";

export { Skeleton, SkeletonColumn, SkeletonElement };