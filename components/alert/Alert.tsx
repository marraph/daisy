"use client";

import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";
import React, {ReactNode, useCallback, useEffect, useImperativeHandle, useState} from "react";

const alert = cva("w-max rounded-lg font-normal p-2 bg-black text-gray text-base flex flex-row items-start shadow-2xl z-50 opacity-100", {
    variants: {
        theme: {
            dark: ["bg-black"],
            success: ["bg-success", "bg-opacity-30"],
            warning: ["bg-warning", "bg-opacity-30"],
            error: ["bg-error", "bg-opacity-30"],
        },
    },
    defaultVariants: {
        theme: "dark",
    },
});

interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

interface AlertTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    description: string;
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alert> {
    duration: number;
}


const AlertIcon = React.forwardRef<HTMLDivElement, AlertIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("m-3", className)} ref={ref} {...props}>
        {icon}
    </div>
));
AlertIcon.displayName = "AlertIcon";


const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(({ title, className, ...props }, ref) => (
        <div className={cn("text-white font-semibold", className)} ref={ref} {...props}>
            {title}
        </div>
));
AlertTitle.displayName = "AlertTitle";


const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(({ description, className, ...props }, ref) => (
    <div className={cn("float-left", className)} ref={ref} {...props}>
        {description}
    </div>
));
AlertDescription.displayName = "AlertDescription";


const AlertContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("px-2 py-1 flex flex-col items-start align-center ", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
AlertContent.displayName = "AlertContent";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ duration, theme, className, ...props }, ref) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timeout);
    }, [duration]);

    useEffect(() => {
        if (!visible) {
            const timeout = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timeout);
        }
    }, [visible]);

    return (
        <div className={cn(alert({ theme }), className, `transition-all duration-500 ease-in-out" ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`)}
             {...props}>
            {props.children}
        </div>
    );
});
Alert.displayName = "Alert";


export { Alert, AlertContent, AlertIcon, AlertTitle, AlertDescription };