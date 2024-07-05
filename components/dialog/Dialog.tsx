"use client";

import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {Seperator} from "../seperator/Seperator";
import {CloseButton} from "../closebutton/CloseButton";

type DialogRef = HTMLDialogElement & {
    show: () => void;
    close: () => void;
};

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    width: number;
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    dialogRef:  React.MutableRefObject<DialogRef>;
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    cancelButton: boolean;
    saveButtonTitle: string;
    dialogRef:  React.MutableRefObject<DialogRef>;
    onClick?: () => void;
    validate?: () => boolean;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
}


const DialogHeader: React.FC<DialogHeaderProps> = ({ title, dialogRef }) => {
    return (
        <>
            <div className={"flex flex-row justify-between items-center p-2 pl-4"}>
                <span className={"text-md text-white"}>{title}</span>
                <CloseButton onClick={() => dialogRef.current.close()}/>
            </div>
            <Seperator/>
        </>
    );
}

const DialogFooter: React.FC<DialogFooterProps> = ({ cancelButton, saveButtonTitle, dialogRef, onClick, validate }) => {
    return (
        <>
            <Seperator/>
            <div className={"bg-dark flex flex-row justify-end items-center p-2 space-x-2"}>
                {cancelButton &&
                    <Button text={"Cancel"}
                            className={"h-8"}
                            onClick={() => dialogRef.current.close()}
                    />
                }
                <Button text={saveButtonTitle}
                        theme={"white"}
                        className={"h-8"}
                        onClick={() => {
                            dialogRef.current.close();
                            onClick();
                        }}
                        disabled={validate()}
                />
            </div>
        </>
    );
}

const DialogContent: React.FC<DialogContentProps> = ({ ...props }) => {
    return (
        <div className={"items-center p-4"}>
            {props.children}
        </div>
    );
}

const Dialog = forwardRef<DialogRef, DialogProps>(({ width, className, ...props }, ref) => {
    const dialogRef = useRef<DialogRef>(null);

    useImperativeHandle(ref, () => ({
        show: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
        ...dialogRef.current,
    }));

    return (
        <dialog className={cn("group backdrop:bg-black/60 backdrop backdrop-opacity-20 backdrop-brightness-0" +
                              "border border-white border-opacity-20 rounded-lg bg-black", className)}
                style={{width: width}}
                {...props}
                ref={dialogRef}
        >
            {props.children}
        </dialog>
    );


});
Dialog.displayName = "Dialog";

export {Dialog, DialogHeader, DialogFooter, DialogContent, DialogRef};