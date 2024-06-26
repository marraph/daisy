import React, {forwardRef} from "react";

export interface ShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
}

const Shortcut = forwardRef<HTMLDivElement, ShortcutProps>(({ text, className, ...props }, ref) => {
    return(
        <div className={"flex items-center rounded-md border border-white border-opacity-15 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-dark h-min text-placeholder text-xs px-1 py-0.5"} ref={ref} {...props}>
            {props.children}
            {text && <span>{text}</span>}
        </div>
    );
});
Shortcut.displayName = "Shortcut";

export { Shortcut };