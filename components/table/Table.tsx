"use client";

import React, {forwardRef, HTMLAttributes, TableHTMLAttributes} from "react";
import { cn } from "../../utils/cn";
import {Button} from "../button/Button";
import {EllipsisVertical} from "lucide-react";

type TableActionProps = React.TableHTMLAttributes<HTMLTableCellElement> & {
    onClick: () => void;
    className?: string;
}

const TableAction = forwardRef<HTMLTableCellElement, TableActionProps>(({ onClick, className, ...props }) => {

    return (
        <td className={cn("px-2 align-middle", className)} {...props}>
            <Button text={""}
                    className={"p-1.5 mx-2 hover:bg-selectwhite hover:text-dark"}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
            >
                <EllipsisVertical size={16}/>
            </Button>
        </td>
    );
});
TableAction.displayName = "TableAction";


const TableCell = forwardRef<HTMLTableCellElement, TableHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => {
    return (
        <td className={cn("p-4 align-middle", className)} ref={ref} {...props} />
    );
});
TableCell.displayName = "TableCell";


const TableRow = forwardRef<HTMLTableRowElement, TableHTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => {
    return(
        <tr className={cn("group/row bg-black border-t border-white border-opacity-20 hover:bg-dark hover:text-white cursor-pointer", className)}
            ref={ref} {...props}>
            {props.children}
        </tr>
    );
});
TableRow.displayName = "TableRow";


const TableHead = forwardRef<HTMLTableCellElement, TableHTMLAttributes<HTMLTableCellElement>>(({className, ...props}, ref) => {
    return (
        <th className={cn("h-12 px-4 text-left text-white align-middle font-medium", className)} ref={ref} {...props} />
    );
});
TableHead.displayName = "TableHead";


const TableHeader = forwardRef<HTMLTableSectionElement, TableHTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => {
    return (
        <thead className={cn("", className)} ref={ref} {...props}>
        {props.children}
        </thead>
    );
});
TableHeader.displayName = "TableHeader";


const TableBody = forwardRef<HTMLTableSectionElement, TableHTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => {
    return (
        <tbody className={cn("", className)} ref={ref} {...props}>
        {props.children}
        </tbody>
    );
});
TableBody.displayName = "TableBody";


const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => {
    return (
        <div className={cn("w-full text-gray cursor-pointer text-base overflow-auto bg-black rounded-lg border border-white border-opacity-20", className)}>
            <table className={cn("", className)} ref={ref} {...props}>
                {props.children}
            </table>
        </div>
    );
});
Table.displayName = "Table";

export {Table, TableBody, TableHeader, TableHead, TableRow, TableCell, TableAction};