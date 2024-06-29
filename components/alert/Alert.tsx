"use client";

import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";
import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";

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


const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("m-3", className)} ref={ref} {...props}>
        {icon}
    </div>
));
AlertIcon.displayName = "AlertIcon";


const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(({ title, className, ...props }, ref) => (
        <div className={cn("text-white font-semibold", className)} ref={ref} {...props}>
            {title}
        </div>
));
AlertTitle.displayName = "AlertTitle";


const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(({ description, className, ...props }, ref) => (
    <div className={cn("float-left", className)} ref={ref} {...props}>
        {description}
    </div>
));
AlertDescription.displayName = "AlertDescription";


const AlertContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("px-2 py-1 flex flex-col items-start align-center ", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
AlertContent.displayName = "AlertContent";

type AlertRef = HTMLDivElement & {
    show: () => void;
    hide: () => void;
};

const Alert = forwardRef<AlertRef, AlertProps>(({ duration, theme, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const alertRef = useRef(null);

    useEffect(() => {
        let showTimeout: NodeJS.Timeout, hideTimeout: NodeJS.Timeout;
        if (visible) {
            setAnimate(true);
            showTimeout = setTimeout(() => {
                if (alertRef.current) {
                    alertRef.current.classList.add('opacity-100', 'translate-y-0');
                    alertRef.current.classList.remove('opacity-0', 'translate-y-full');
                }
            }, 10);
            hideTimeout = setTimeout(() => {
                if (alertRef.current) {
                    alertRef.current.classList.remove('opacity-100', 'translate-y-0');
                    alertRef.current.classList.add('opacity-0', 'translate-y-full');
                }
                hideTimeout = setTimeout(() => {
                    setVisible(false);
                    setAnimate(false);
                }, 500);
            }, duration);
        }
        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [visible, duration]);

    useImperativeHandle(ref, () => ({
        show: () =>  {
            setVisible(true);
            setAnimate(true);
        },
        hide: () => {
            setVisible(false);
            setVisible(false);
        },
        ...alertRef.current,
    }));

    return (
        <>
            {animate &&
                <div className={`
                     fixed bottom-4 right-4 z-50 border border-white border-opacity-20 bg-dark
                     w-max rounded-lg font-normal p-2 text-gray text-base flex flex-row items-center
                     shadow-2xl transition-all duration-500 ease-in-out opacity-0 translate-y-full`}
                     ref={alertRef} {...props}>
                     {props.children}
                </div>
            }
        </>
    );
});
Alert.displayName = "Alert";


export {Alert, AlertContent, AlertIcon, AlertTitle, AlertDescription, AlertRef};