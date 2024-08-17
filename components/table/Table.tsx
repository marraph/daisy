"use client";

import React, {HTMLAttributes, TableHTMLAttributes} from "react";
import {cn} from "../../utils/cn";
import {Button} from "../button/Button";
import {EllipsisVertical} from "lucide-react";

const TableAction: React.FC<HTMLAttributes<HTMLTableCellElement> & { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({ onClick, ...props }) => {
    return (
        <td className={cn("px-2")} {...props}>
            <Button text={""}
                    size={"medium"}
                    className={"p-1.5 bg-zinc-100 hover:bg-zinc-200"}
                    icon={<EllipsisVertical size={16}/>}
                    onClick={(e) => {
                        onClick(e);
                    }}
            />
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