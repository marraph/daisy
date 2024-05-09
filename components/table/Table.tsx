import React from "react";
import { cn } from "../../utils/cn";

const TableCell = React.forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td className={cn("p-4 align-middle", className)} ref={ref} {...props} />
));
TableCell.displayName = "TableCell";


const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr className={cn("bg-black border-t border-white border-opacity-20 hover:bg-selected hover:text-white cursor-pointer", className)} ref={ref} {...props}>
        {props.children}
    </tr>
));
TableRow.displayName = "TableRow";


const TableHead = React.forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th className={cn("h-12 px-4 text-left text-white align-middle font-medium", className)} ref={ref} {...props} />
));
TableHead.displayName = "TableHead";


const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <thead className={cn("", className)} ref={ref} {...props}>
        {props.children}
    </thead>
));
TableHeader.displayName = "TableHeader";


const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <tbody className={cn("", className)} ref={ref} {...props}>
        {props.children}
    </tbody>
));
TableBody.displayName = "TableBody";


const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className={cn("w-full text-gray text-base overflow-auto rounded-lg border border-white border-opacity-20", className)}>
        <table className={cn("", className)} ref={ref} {...props}>
            {props.children}
        </table>
    </div>
));
Table.displayName = "Table";

export { Table, TableBody, TableHeader, TableHead, TableRow, TableCell };