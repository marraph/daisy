"use client";

import React, {forwardRef, HTMLAttributes, MutableRefObject, useCallback, useImperativeHandle, useRef} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {CloseButton} from "../closebutton/CloseButton";
import {Switch, SwitchRef} from "../switch/Switch";
import {DialogProvider, useDialogContext} from "./DialogProvider";

type DialogRef = HTMLDialogElement & {
    show: () => void;
    close: () => void;
};

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    width: number;
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    cancelButton?: boolean;
    saveButtonTitle: string;
    switchButton?: boolean;
    switchRef?: MutableRefObject<SwitchRef>;
    onClick?: () => void;
    disabledButton?: boolean;
}


const DialogHeader: React.FC<{ title: string }> = ({ title }) => {
    const { dialogRef, onClose } = useDialogContext();

    return (
        <div className={"rounded-t-lg border border-edge flex flex-row justify-between items-center p-4 pr-2"}>
            <span className={"text-md text-white"}>{title}</span>
            <CloseButton onClick={() => {
                    dialogRef.current.close();
                    onClose();
                }}
            />
        </div>
    );
}

const DialogFooter: React.FC<DialogFooterProps> = ({ disabledButton = false, cancelButton = true, saveButtonTitle, onClick, switchButton = false, switchRef }) => {
    const { dialogRef, onClose } = useDialogContext();

    return (
        <div className={"rounded-b-lg border border-edge bg-dark flex flex-row justify-end items-center p-2 space-x-2"}>
            {switchButton &&
                <div className={"flex flex-row items-center space-x-2 text-gray text-xs mr-16"}>
                    <span>{"Create more"}</span>
                    <Switch ref={switchRef}/>
                </div>
            }
            {cancelButton &&
                <Button text={"Cancel"}
                        className={"h-8"}
                        onClick={() => {
                            dialogRef.current.close();
                            onClose();
                        }}
                />
            }
            <Button text={saveButtonTitle}
                    theme={"white"}
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

const Dialog = forwardRef<DialogRef, DialogProps>(({ width, className, ...props }, ref) => {
    const dialogRef = useRef<DialogRef>(null);

    const handleClose = useCallback(() => {
        dialogRef.current?.close();
    }, []);

    useImperativeHandle(ref, () => ({
        show: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
        ...dialogRef.current,
    }));

    return (
        <div className={"flex items-center justify-center"}>
            <dialog
                key={Math.random().toString(36).substr(2, 9)}
                className={cn("group backdrop:bg-black/60 backdrop backdrop-opacity-20 backdrop-brightness-0 rounded-lg bg-black overflow-visible", className)}
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