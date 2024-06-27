"use client";

import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {cn} from "../../utils/cn";

type DialogRef = HTMLDialogElement & {
    show: () => void;
    close: () => void;
};

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {}

const Dialog = forwardRef<DialogRef, DialogProps>(({ className, ...props }, ref) => {
    const dialogRef = useRef<DialogRef>(null);

    useImperativeHandle(ref, () => ({
        show: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
        ...dialogRef.current,
    }));

    return (
        <dialog className={cn("group backdrop:bg-black/60 rounded-lg bg-black backdrop backdrop-opacity-20 backdrop-brightness-0", className)}
                {...props} ref={dialogRef}>
            {props.children}
        </dialog>
    );


});
Dialog.displayName = "Dialog";

export {Dialog, DialogRef};