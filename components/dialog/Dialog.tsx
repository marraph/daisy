"use client";

import React from "react";
import {cn} from "../../utils/cn";

interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    description: string;
}

const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(({ title, className, ...props }, ref) => (
    <div className={cn("text-xl text-white font-semibold pb-2", className)} ref={ref}  {...props}>
        {title}
    </div>
));
DialogTitle.displayName = "DialogTitle";


const DialogDescription = React.forwardRef<HTMLDivElement, DialogDescriptionProps>(({ description, className, ...props }, ref) => (
    <div className={cn("text-base text-gray font-normal", className)} ref={ref} {...props}>
        {description}
    </div>
));
DialogDescription.displayName = "DialogDescription";


const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("text-base text-gray font-normal m-2", className)} ref={ref} {...props}>
        {props.children}
    </div>
));
DialogContent.displayName = "DialogContent";


const DialogSeperator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
    <hr className={cn("flex-grow text-white text-opacity-20")} ref={ref} {...props} />
));
DialogSeperator.displayName = "DialogSeperator";


const Dialog = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(({ className, ...props }, ref) => (
    <dialog className={cn("group backdrop:bg-black/50 rounded-lg bg-black backdrop backdrop-opacity-20 backdrop-brightness-0" , className)} ref={ref} {...props}>
        {props.children}
    </dialog>

));
Dialog.displayName = "Dialog";

function showDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
}

export { Dialog, DialogTitle, DialogDescription, DialogContent, DialogSeperator, showDialog };