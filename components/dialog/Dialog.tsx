"use client";

import React, {
    DialogHTMLAttributes,
    forwardRef,
    HTMLAttributes,
    MutableRefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef, useState
} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {CloseButton} from "../closebutton/CloseButton";
import {DialogProvider, useDialogContext} from "./DialogProvider";
import ReactDOM from "react-dom";

type DialogRef = HTMLDialogElement & {
    show: () => void;
    close: () => void;
};

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
    width: number;
    onClose?: () => void;
}

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
}

interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    cancelButton?: boolean;
    saveButtonTitle: string;
    cancelButtonTitle?: string;
    onClick?: () => void;
    disabledButton?: boolean;
}


const DialogHeader: React.FC<DialogHeaderProps> = ({ title, description }) => {
    const { dialogRef, onClose } = useDialogContext();

    return (
        <div className={"flex flex-row justify-between items-center p-2 rounded-t-lg border border-zinc-300 dark:border-edge"}>
            <div className={"flex flex-col"}>
                <span className={"text-md text-zinc-800 dark:text-white"}>{title}</span>
                {description &&
                    <span className={"text-xs text-zinc-500 dark:text-gray"}>{description}</span>
                }
            </div>
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
        <div className={"border-x border-zinc-300 dark:border-edge items-center p-4"} {...props}>
            {props.children}
        </div>
    );
}

const Dialog = forwardRef<DialogRef, DialogProps>(({ width, className, onClose, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const dialogRef = useRef<DialogRef>(null);

    const handleClose = useCallback(() => {
        onClose && onClose();
        dialogRef.current?.close();
        setIsOpen(false);
    }, [onClose]);

    useEffect(() => {
        const dialogElement = dialogRef.current;

        const handleCancel = (event: Event) => {
            event.preventDefault();
            handleClose();
        };

        const handleShow = () => {
            setIsOpen(true);
        };

        if (dialogElement) {
            dialogElement.addEventListener('cancel', handleCancel);
            dialogElement.addEventListener('show', handleShow);
        }

        return () => {
            if (dialogElement) {
                dialogElement.removeEventListener('cancel', handleCancel);
                dialogElement.removeEventListener('show', handleShow);
            }
        };
    }, [handleClose]);

    useImperativeHandle(ref, () => ({
        show: () => {
            dialogRef.current?.showModal();
            setIsOpen(true);
        },
        close: () => {
            dialogRef.current?.close();
            setIsOpen(false);
            onClose && onClose();
        },
        ...dialogRef.current,
    }));

    return (
        <div className={isOpen && "fixed inset-0 backdrop-blur-sm backdrop:bg-black/50"}>
            <dialog
                className={cn("group rounded-lg bg-zinc-100 dark:bg-black", className)}
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