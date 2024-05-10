import React, {ReactNode} from "react";
import {cn} from "../../utils/cn";

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    shortcut?: string;
}

interface ContextMenuIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

const ContextMenuSeperator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
    <div className={cn("rounded-full w-full")} {...props}>
        <hr className={cn("flex-grow text-white text-opacity-20 my-1 rounded-lg")} ref={ref} {...props}>
        </hr>
    </div>
));
ContextMenuSeperator.displayName = "ContextMenuSeperator";


const ContextMenuIcon = React.forwardRef<HTMLDivElement, ContextMenuIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("mr-3", className)} ref={ref} {...props}>
        {icon}
    </div>
));
ContextMenuIcon.displayName = "ContextMenuIcon";


const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(({ title, shortcut, className, ...props }, ref) => (
    <div className={cn("group cursor-pointer rounded-lg hover:bg-selected hover:text-white p-2 flex justify-normal items-center", className)} ref={ref} {...props}>
        {props.children}
        {title}
        {shortcut &&
        <span className={"hidden group-hover:block text-sm text-gray"}>
            {shortcut}
        </span>
        }
    </div>
));
ContextMenuItem.displayName = "ContextMenuItem";


const ContextMenu = React.forwardRef<HTMLDivElement, React.AreaHTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray border border-white border-opacity-20" , className)} ref={ref} {...props}>
        {props.children}
    </div>
));
ContextMenu.displayName = "ContextMenuItem";


export { ContextMenu, ContextMenuItem, ContextMenuIcon, ContextMenuSeperator };