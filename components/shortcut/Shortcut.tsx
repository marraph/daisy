import React from "react";

export interface ShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
}

const Shortcut = React.forwardRef<HTMLDivElement, ShortcutProps>(({ text, className, ...props }, ref) => (
        <div className={"flex items-center rounded-md bg-dark h-min text-placeholder text-xs px-1 py-0.5"} ref={ref} {...props}>
            <span>{text}</span>
        </div>
    ),
);
Shortcut.displayName = "Shortcut";

export { Shortcut };