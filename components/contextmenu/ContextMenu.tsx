"use client";

import React, {forwardRef, ReactNode, useState} from "react";
import {cn} from "../../utils/cn";
import {Check} from "lucide-react";
import { Shortcut } from "../shortcut/Shortcut";

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    shortcut?: string;
    icon?: ReactNode;
    onClick?: () => void;
}


const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(({ title, icon, shortcut, className, ...props }, ref) => (
    <div className={cn("group bg-black cursor-pointer rounded-lg hover:bg-dark hover:text-white p-2 flex flex-row justify-between items-center space-x-4", className)} ref={ref} {...props}>
        <div className={"flex flex-row items-center space-x-2"}>
            {icon && icon}
            <span>{title}</span>
        </div>
        {shortcut &&
            <div className={"hidden group-hover:block"}>
                <Shortcut text={shortcut}/>
            </div>
        }
    </div>
));
ContextMenuItem.displayName = "ContextMenuItem";


const ContextMenu = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <div className={cn("z-50 w-full rounded-lg font-normal p-1 bg-black text-gray border border-edge", className)} ref={ref} {...props}>
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