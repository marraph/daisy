import React, {createContext, useContext, ReactNode} from 'react';
import {DialogRef} from "./Dialog";

interface DialogContextProps {
    dialogRef: React.RefObject<DialogRef>;
    onClose: () => void;
}

interface DialogProviderProps {
    children: ReactNode;
    dialogRef: React.RefObject<DialogRef>;
    onClose: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogContext must be used within a DialogProvider');
    }
    return context;
};

const DialogProvider: React.FC<DialogProviderProps> = ({ children, dialogRef, onClose }) => (
    <DialogContext.Provider value={{ dialogRef, onClose }}>
        {children}
    </DialogContext.Provider>
);

export { DialogProvider, useDialogContext };