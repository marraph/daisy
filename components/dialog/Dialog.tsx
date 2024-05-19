"use client";

import React from "react";
import {cn} from "../../utils/cn";

const DialogSeperator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
    <hr className={cn("flex-grow text-white text-opacity-20")} ref={ref} {...props} />
));
DialogSeperator.displayName = "DialogSeperator";


const Dialog = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(({ className, ...props }, ref) => (
    <dialog className={cn("group backdrop:bg-black/60 rounded-lg bg-black backdrop backdrop-opacity-20 backdrop-brightness-0" , className)} ref={ref} {...props}>
        {props.children}
    </dialog>

));
Dialog.displayName = "Dialog";

export { Dialog, DialogSeperator };