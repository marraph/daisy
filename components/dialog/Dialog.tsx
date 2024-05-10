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


const Dialog = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(({ className, ...props }, ref) => (
    <dialog className={cn("group rounded-lg p-5 bg-black backdrop backdrop-opacity-20 backdrop-brightness-0" , className)} ref={ref} {...props}>
        {props.children}
    </dialog>

));
Dialog.displayName = "Dialog";

function showDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
}

export { Dialog, DialogTitle, DialogDescription, showDialog };