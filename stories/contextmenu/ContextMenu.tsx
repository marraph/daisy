import React from "react";
import {cn} from "../../utils/cn";

interface ContextMenuItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(({ title, className, ...props }, ref) => (
    <div className={cn("cursor-pointer rounded-md hover:bg-selected hover:text-white px-4 py-2", className)} ref={ref} {...props}>
        {title}
    </div>
));
ContextMenuItem.displayName = "ContextMenuItem";


const ContextMenu = React.forwardRef<HTMLDivElement, React.AreaHTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("group w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray" , className)} ref={ref} {...props}>
        {props.children}
    </div>
));
ContextMenu.displayName = "ContextMenuItem";


export { ContextMenu, ContextMenuItem };