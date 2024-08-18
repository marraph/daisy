"use client";

import React, {
    forwardRef,
    HTMLAttributes,
    MutableRefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef
} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {CloseButton} from "../closebutton/CloseButton";
import {DialogProvider, useDialogContext} from "./DialogProvider";

type DialogRef = HTMLDialogElement & {
    show: () => void;
    close: () => void;
};

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    width: number;
    onClose?: () => void;
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    cancelButton?: boolean;
    saveButtonTitle: string;
    cancelButtonTitle?: string;
    onClick?: () => void;
    disabledButton?: boolean;
}


const DialogHeader: React.FC<{ title: string }> = ({ title }) => {
    const { dialogRef, onClose } = useDialogContext();

    return (
        <div className={"flex flex-row justify-between items-center p-4 pr-2 rounded-t-lg border border-zinc-300 dark:border-edge"}>
            <span className={"text-md text-zinc-800 dark:text-white"}>{title}</span>
            <CloseButton
                className={"bg-zinc-100 dark:bg-black"}
                onClick={() => {
                    dialogRef.current.close();
                    onClose();
                }}
            />
        </div>
    );
}

const DialogFooter: React.FC<DialogFooterProps> = ({ disabledButton = false, cancelButton = true, cancelButtonTitle = "Cancel", saveButtonTitle, onClick, ...props }) => {
    const { dialogRef, onClose } = useDialogContext();

    return (
        <div className={"flex flex-row justify-end items-center p-2 space-x-2 rounded-b-lg border border-zinc-300 dark:border-edge bg-zinc-200 dark:bg-black-light "}>
            {props.children}
            {cancelButton &&
                <Button text={cancelButtonTitle}
                        className={"h-8"}
                        onClick={() => {
                            dialogRef.current.close();
                            onClose();
                        }}
                />
            }
            <Button text={saveButtonTitle}
                    theme={"primary"}
                    className={"h-8"}
                    onClick={() => onClick()}
                    disabled={disabledButton}
            />
        </div>
    );
}

const DialogContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={"border-x border-edge items-center p-4"} {...props}>
            {props.children}
        </div>
    );
}

const Dialog = forwardRef<DialogRef, DialogProps>(({ width, className, onClose, ...props }, ref) => {
    const dialogRef = useRef<DialogRef>(null);

    const handleClose = useCallback(() => {
        onClose && onClose();
        dialogRef.current?.close();
    }, [onClose]);

    useEffect(() => {
        const dialogElement = dialogRef.current;

        const handleCancel = (event: Event) => {
            event.preventDefault();
            handleClose();
        };

        if (dialogElement) {
            dialogElement.addEventListener('cancel', handleCancel);
        }

        return () => {
            if (dialogElement) {
                dialogElement.removeEventListener('cancel', handleCancel);
            }
        };
    }, [handleClose]);

    useImperativeHandle(ref, () => ({
        show: () => dialogRef.current?.showModal(),
        close: () => {
            dialogRef.current?.close();
            onClose && onClose();
        },
        ...dialogRef.current,
    }));

    return (
        <div className={"flex items-center justify-center"}>
            <dialog
                className={cn("group backdrop:bg-black/60 backdrop backdrop-opacity-20 backdrop-brightness-0 rounded-lg bg-zinc-100 dark:bg-black overflow-visible", className)}
                style={{width: width}}
                {...props}
                ref={dialogRef}
            >
                <DialogProvider dialogRef={dialogRef} onClose={handleClose}>
                    {props.children}
                </DialogProvider>
            </dialog>
        </div>
    );
});
Dialog.displayName = "Dialog";

export {Dialog, DialogHeader, DialogFooter, DialogContent, DialogRef};