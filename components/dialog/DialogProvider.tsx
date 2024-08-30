import React, {createContext, useContext, ReactNode, RefObject} from 'react';
import {DialogRef} from "./Dialog";
import {FieldConfig} from "@/hooks/useDialogValidation";

interface DialogContextProps<T extends Record<string, FieldConfig>> {
    dialogRef: RefObject<DialogRef>;
    onClose: () => void;
    values: Record<keyof T, any>;
    errors: Record<keyof T, string>;
    setValue: (field: keyof T, value: any) => void;
    onSubmit: () => void;
    isValid: boolean;
}

interface DialogProviderProps<T extends Record<string, FieldConfig>> {
    children: RefObject<DialogRef>;
    onClose: () => void;
    values: Record<keyof T, any>;
    errors: Record<keyof T, string>;
    setValue: (field: keyof T, value: any) => void;
    onSubmit: () => void;
    isValid: boolean;
}

const DialogContext = createContext<DialogContextProps<any> | undefined>(undefined);

const useDialogContext = <T extends Record<string, FieldConfig>>() => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogContext must be used within a DialogProvider');
    }
    return context as DialogContextProps<T>;
};

const DialogProvider = ({ children, dialogRef, onClose, values, errors, setValue, onSubmit, isValid }) => (
    <DialogContext.Provider value={{ dialogRef, onClose, values, errors, setValue, onSubmit, isValid }}>
        {children}
    </DialogContext.Provider>
);

export { DialogProvider, useDialogContext };