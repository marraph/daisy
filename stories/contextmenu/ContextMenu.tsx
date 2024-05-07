import React, {ReactNode} from "react";
import {cn} from "../../utils/cn";

interface ContextMenuItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

interface ContextMenuIconProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

interface ContextMenuShortcutProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    shortcut: String;
}

const ContextMenuSeperator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
    <div className={cn("rounded-full")}>
        <hr className={cn("flex-grow text-placeholder my-2 rounded-lg")} ref={ref} {...props}>
        </hr>
    </div>
));
ContextMenuSeperator.displayName = "ContextMenuSeperator";

const ContextMenuShortcut = React.forwardRef<HTMLDivElement, ContextMenuShortcutProps>(({ shortcut, className, ...props }, ref) => (
    <div className={cn("ml-6 bg-dark text-gray rounded-md", className)} ref={ref} {...props}>
        <span className={cn("text-sm px-1 py-1")}>{shortcut}</span>
    </div>
));
ContextMenuShortcut.displayName = "ContextMenuShortcut";

const ContextMenuIcon = React.forwardRef<HTMLDivElement, ContextMenuIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("ml-6", className)} ref={ref} {...props}>
        {icon}
    </div>
));
ContextMenuIcon.displayName = "ContextMenuIcon";

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(({ title, className, ...props }, ref) => (
    <div className={cn("cursor-pointer rounded-lg hover:bg-selected hover:text-white px-2 py-1 flex justify-between items-center", className)} ref={ref} {...props}>
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


export { ContextMenu, ContextMenuItem, ContextMenuIcon, ContextMenuShortcut, ContextMenuSeperator };