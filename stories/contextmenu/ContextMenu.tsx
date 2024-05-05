import React from "react";
import {Basecard} from "../basecard/Basecard";

export interface ContextMenuItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

export interface ContextMenuProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    theme: "dark" | "success" | "warning" | "error";
    size: "small" | "medium" | "large";
    border: "default" | "none";
    opacity: "default" | "none";
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ title }) => {
    return(
        <div className={"w-full bg-black text-gray cursor-pointer rounded-md hover:bg-selected hover:text-white px-4 py-2"}>
            {title}
        </div>
    );
}

const ContextMenu: React.FC<ContextMenuProps> = ({ theme, size, border, opacity, className}) => {
    return (
            <Basecard theme={theme} size={size} border={border} opacity={opacity} className={className}>
            </Basecard>
    );
};

export default Object.assign(ContextMenu, { ContextMenuItem });