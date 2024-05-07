import React, {ReactNode} from "react";
import {cn} from "../../utils/cn";

interface ContextMenuItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

interface ContextMenuIconProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

const ContextMenuSeperator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
    <div className={"rounded-full"}>
        <hr className={"flex-grow text-placeholder my-2 rounded-lg"} ref={ref} {...props}>
        </hr>
    </div>
));
ContextMenuSeperator.displayName = "ContextMenuSeperator";

const ContextMenuIcon = React.forwardRef<HTMLDivElement, ContextMenuIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("ml-8", className)} ref={ref} {...props}>
        {icon}
    </div>
));
ContextMenuIcon.displayName = "ContextMenuIcon";

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(({ title, className, ...props }, ref) => (
    <div className={cn("cursor-pointer rounded-lg hover:bg-selected hover:text-white px-4 py-2 flex items-center", className)} ref={ref} {...props}>
        {title}
        {props.children}
    </div>
));
ContextMenuItem.displayName = "ContextMenuItem";


const ContextMenu = React.forwardRef<HTMLDivElement, React.AreaHTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("group w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray" , className)} ref={ref} {...props}>
        {props.children}
    </div>
));
ContextMenu.displayName = "ContextMenuItem";


export { ContextMenu, ContextMenuItem, ContextMenuIcon, ContextMenuSeperator };