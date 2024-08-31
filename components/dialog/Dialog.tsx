"use client";

import React, {
    DialogHTMLAttributes,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {CloseButton} from "../closebutton/CloseButton";
import {DialogProvider, useDialogContext} from "./DialogProvider";
import {FieldConfig, useDialogForm} from "@/hooks/useDialogValidation";
import {TooltipProvider, useTooltip} from "@/components/tooltip/TooltipProvider";
import {BadgeX} from "lucide-react";

type DialogRef = HTMLDialogElement & {
    show: () => void;
    close: () => void;
};

interface DialogProps<T extends Record<string, FieldConfig>> extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'onSubmit'> {
    width: number;
    onClose?: () => void;
    fields?: T;
    onSubmit: (values: Record<keyof T, any>) => void;
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
}

interface DialogContentProps<T extends Record<string, FieldConfig>> {
    children: ((props?: {
        values: Record<keyof T, any>;
        setValue: (field: keyof T, value: any) => void;
    }) => ReactNode) | ReactNode;
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

const DialogFooter: React.FC<DialogFooterProps> = ({ cancelButton = true, cancelButtonTitle = "Cancel", saveButtonTitle, onClick, ...props }) => {
    const { dialogRef, onClose, onSubmit, isValid, errors } = useDialogContext();
    const { addTooltip, removeTooltip } = useTooltip();

    const hasErrors = Object.values(errors).some((error) => error !== '');

    return (
        <div className={"flex flex-row justify-end items-center p-2 space-x-2 rounded-b-lg border border-zinc-300 dark:border-edge bg-zinc-200 dark:bg-black-light "}>
            {props.children}
            {cancelButton &&
                <Button
                    text={cancelButtonTitle}
                    className={"h-8"}
                    onClick={() => {
                        dialogRef.current.close();
                        onClose();
                    }}
                />
            }
            <div onMouseEnter={(e) => hasErrors && addTooltip({
                    anchor: "bc",
                    message: "",
                    trigger: e.currentTarget.getBoundingClientRect(),
                    customTooltip:
                    <div className={"flex flex-col space-y-2"}>
                        <div className={"flex flex-row items-center space-x-1 text-xs text-error font-medium"}>
                            <BadgeX size={12}/>
                            <span>{Object.values(errors).length === 1 ? "Error:" : "Errors:"}</span>
                        </div>
                        <div className={"flex flex-col space-y-0.5 text-xs text-zinc-800 dark:text-gray"}>
                            {Object.entries(errors).map(([key, value]) => {
                                if (value !== '') {
                                    return <span key={key}>{"• " + value}</span>;
                                }
                            })}
                        </div>
                    </div>
                })}
                onMouseLeave={() => removeTooltip()}
            >
                <Button
                    text={saveButtonTitle}
                    theme={"primary"}
                    className={"h-8"}
                    onClick={onSubmit}
                    disabled={!isValid}
                />
            </div>
        </div>
    );
}

const DialogContent: React.FC<DialogContentProps<any>> = ({ children }) => {
    const { values, setValue } = useDialogContext();

    return (
        <div className={"border-x border-zinc-300 dark:border-edge items-center p-4"}>
            {typeof children === 'function'
                ? children({ values, setValue })
                : children}
        </div>
    );
}

const Dialog = forwardRef<DialogRef, DialogProps<any>>(({ width, fields, onSubmit, onClose, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<DialogRef>(null);
    const { values, errors, setValue, validateAll, isValid } = useDialogForm(fields);

    const handleClose = useCallback(() => {
        onClose && onClose();
        dialogRef.current?.close();
        setIsOpen(false);
    }, [onClose]);

    const handleSubmit = useCallback(() => {
        if (validateAll()) {
            onSubmit(values);
            handleClose();
        }
    }, [values, onSubmit, handleClose, validateAll]);

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
        <TooltipProvider>
        <div className={isOpen && "fixed inset-0 backdrop-blur-sm backdrop:bg-black/50"}>
            <dialog
                className={cn("group rounded-lg bg-zinc-100 dark:bg-black", className)}
                style={{width: width}}
                {...props}
                ref={dialogRef}
            >
                <DialogProvider
                    dialogRef={dialogRef}
                    onClose={handleClose}
                    values={values}
                    errors={errors}
                    setValue={setValue}
                    onSubmit={handleSubmit}
                    isValid={isValid}
                >
                    {props.children}
                </DialogProvider>
            </dialog>
        </div>
        </TooltipProvider>
    );
});
Dialog.displayName = "Dialog";

export {Dialog, DialogHeader, DialogFooter, DialogContent, DialogRef};