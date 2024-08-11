import React from "react";
import {cn} from "../../utils/cn";

export interface ShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ text, className, ...props }) => {
    return(
        <div className={cn("h-min flex items-center rounded-md border text-xs px-1 py-0.5 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] " +
             "bg-zinc-300 dark:bg-dark text-zinc-500 dark:text-marcador border-zinc-400 dark:border-edge")}
             {...props}
        >
            {props.children}
            {text && <span>{text}</span>}
        </div>
    );
}

export { Shortcut };