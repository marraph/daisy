"use client";

import React, {HTMLAttributes, ReactNode, TableHTMLAttributes, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {EllipsisVertical} from "lucide-react";
import ReactDOM from "react-dom";
import {useOutsideClick} from "@/hooks/useOutsideClick";

const TableActionDropDownPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
}

const TableAction: React.FC<HTMLAttributes<HTMLTableCellElement> & { actionMenu: ReactNode, onClose?: () => void }> = ({ actionMenu, onClose, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useOutsideClick((e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target as Node) &&
            menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpen(false);
            onClose?.();
        }
    });

    return (
        <td className={cn("pl-2 pr-4")} {...props}>
            <Button text={""}
                    size={"medium"}
                    className={"w-max p-1.5 bg-zinc-100 hover:bg-zinc-200 float-right"}
                    icon={<EllipsisVertical size={16}/>}
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen &&
                <TableActionDropDownPortal>
                    <div className={"absolute z-50"}
                         ref={menuRef}
                         style={{
                             top: buttonRef.current?.getBoundingClientRect().bottom + 4,
                             right: window.innerWidth - buttonRef.current?.getBoundingClientRect().right
                         }}
                    >
                        {actionMenu}
                    </div>
                </TableActionDropDownPortal>
            }
        </td>
    );
}

const TableCell: React.FC<TableHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => {
    return (
        <td className={cn("p-4 align-middle", className)} {...props} />
    );
}

const TableRow: React.FC<TableHTMLAttributes<HTMLTableRowElement>> = ({ className, ...props }) => {
    return(
        <tr className={cn("group/row bg-zinc-100 dark:bg-black-light cursor-pointer border-t border-zinc-300 " +
            "dark:border-edge hover:bg-zinc-200 dark:hover:bg-dark hover:text-zinc-800 dark:hover:text-white", className)}
            {...props}
        >
            {props.children}
        </tr>
    );
}

const TableHead: React.FC<TableHTMLAttributes<HTMLTableCellElement>> = ({className, ...props}) => {
    return (
        <th className={cn("h-12 px-4 text-left text-zinc-500 dark:text-marcador " +
            "text-sm align-middle font-medium bg-zinc-200 dark:bg-dark", className)}
            {...props}
        />
    );
}

const TableHeader: React.FC<TableHTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => {
    return (
        <thead className={cn("", className)} {...props}>
            {props.children}
        </thead>
    );
}

const TableBody: React.FC<TableHTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => {
    return (
        <tbody className={cn("", className)} {...props}>
            {props.children}
        </tbody>
    );
}

const Table: React.FC<TableHTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => {
    return (
        <div className={cn("w-full text-zinc-700 dark:text-gray cursor-pointer text-base overflow-auto " +
            "bg-zinc-200 dark:bg-dark rounded-lg border border-zinc-300 dark:border-edge", className)}
        >
            <table className={cn("", className)} {...props}>
                {props.children}
            </table>
        </div>
    );
}

export { Table, TableBody, TableHeader, TableHead, TableRow, TableCell, TableAction };