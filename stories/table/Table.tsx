import React from "react";
import { cn } from "../../utils/cn";

const TableCell = React.forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} ref={ref} {...props} />
));
TableCell.displayName = "TableCell";


const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} ref={ref} {...props} />
));
TableRow.displayName = "TableRow";


const TableHead = React.forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} ref={ref} {...props} />
));
TableHead.displayName = "TableHead";


const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <thead className={cn("[&_tr]:border-b", className)} ref={ref} {...props} />
));
TableHeader.displayName = "TableHeader";


const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} ref={ref} {...props} />
));
TableBody.displayName = "TableBody";


const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className="relative w-full text-gray text-base overflow-auto">
        <table className={cn("", className)} ref={ref} {...props} />
    </div>
));
Table.displayName = "Table";

export { Table, TableBody, TableHeader, TableHead, TableRow, TableCell };