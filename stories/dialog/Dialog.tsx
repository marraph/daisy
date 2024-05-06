import React from "react";
import {cn} from "../../utils/cn";

interface DialogTitleProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

interface DialogDescriptionProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    description: string;
}

const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(({ title, className, ...props }, ref) => (
    <div className={cn("text-xl text-white font-semibold", className)} ref={ref}  {...props}>
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



const Dialog = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(({ className, ...props }, ref) => (
    <dialog className={cn("group w-full rounded-lg font-semibold py-2 px-2 bg-black" , className)} ref={ref} {...props}>
        {props.children}
    </dialog>

));
Dialog.displayName = "Dialog";


export { Dialog, DialogTitle, DialogDescription };