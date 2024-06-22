"use client";

import React, {forwardRef, ReactNode, useState} from "react";
import {cn} from "../../utils/cn";
import {Check} from "lucide-react";

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    shortcut?: string;
    icon: ReactNode;
    onClick?: () => void;
}


const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(({ title, icon, shortcut, className, ...props }, ref) => (
    <div className={cn("bg-black group cursor-pointer rounded-lg hover:bg-selected hover:text-white p-2 flex flex-row justify-between items-center", className)} ref={ref} {...props}>
        <div className={"flex flex-row items-center space-x-2"}>
            {icon}
            {title}
        </div>
        {shortcut &&
            <span className={"hidden group-hover:block text-sm text-gray "}>
                {shortcut}
            </span>
        }
    </div>
));
ContextMenuItem.displayName = "ContextMenuItem";


const ContextMenu = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <div className={cn("w-full rounded-lg font-normal py-2 bg-black text-gray " +
            "border border-white border-opacity-20", className)} ref={ref} {...props}>
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement<ContextMenuItemProps>(child)) {
                    return React.cloneElement(child, {
                        onClick: () => {
                            child.props.onClick && child.props.onClick();
                        },
                    });
                }
                return child;
            })}
        </div>
    )

});
ContextMenu.displayName = "ContextMenuItem";


export {ContextMenu, ContextMenuItem};