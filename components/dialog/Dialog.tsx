"use client";

import React from "react";
import {cn} from "../../utils/cn";

const Dialog = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(({ className, ...props }, ref) => {
    return (
        <dialog className={cn("group backdrop:bg-black/60 rounded-lg bg-black backdrop backdrop-opacity-20 backdrop-brightness-0", className)}{...props} ref={ref}>
            {props.children}
        </dialog>
    );


});
Dialog.displayName = "Dialog";

export {Dialog};