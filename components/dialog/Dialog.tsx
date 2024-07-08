"use client";

import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {Seperator} from "../seperator/Seperator";
import {CloseButton} from "../closebutton/CloseButton";
import {Switch, SwitchRef} from "../switch/Switch";

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
    onClose?: () => void;
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    cancelButton: boolean;
    saveButtonTitle: string;
    switchButton: boolean;
    dialogRef:  React.MutableRefObject<DialogRef>;
    switchRef?: React.MutableRefObject<SwitchRef>;
    onClick?: () => void;
    onClose?: () => void;
    disabledButton?: boolean;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
}


const DialogHeader: React.FC<DialogHeaderProps> = ({ title, dialogRef, onClose }) => {
    return (
        <div className={"rounded-t-lg border border-white border-opacity-20 flex flex-row justify-between items-center p-4 pr-2"}>
            <span className={"text-md text-white"}>{title}</span>
            <CloseButton onClick={() => {
                    dialogRef.current.close();
                    onClose();
            }}
            />
        </div>
    );
}

const DialogFooter: React.FC<DialogFooterProps> = ({ disabledButton, cancelButton, saveButtonTitle, dialogRef, onClick, switchButton, switchRef, onClose }) => {
    return (
        <div className={"rounded-b-lg border border-white border-opacity-20 bg-dark flex flex-row justify-end items-center p-2 space-x-2"}>
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

const DialogContent: React.FC<DialogContentProps> = ({ ...props }) => {
    return (
        <div className={"border-x border-white border-opacity-20 items-center p-4"}>
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
        <div className={"flex items-center justify-center"}>
            <dialog
                className={cn("group backdrop:bg-black/60 backdrop backdrop-opacity-20 backdrop-brightness-0 rounded-lg bg-black overflow-visible", className)}
                style={{width: width}}
                {...props}
                ref={dialogRef}
            >
                {props.children}
            </dialog>
        </div>
    );


});
Dialog.displayName = "Dialog";

export {Dialog, DialogHeader, DialogFooter, DialogContent, DialogRef};