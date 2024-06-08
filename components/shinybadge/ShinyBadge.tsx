import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    color: string;
}

const ShinyBadge = React.forwardRef<HTMLDivElement, BadgeProps>(({color, text, className, ...props }, ref) => (
    <div className={"border border-white border-opacity-20 rounded-md"}>
        <div className={`w-max flex items-center font-semibold space-x-2 px-2 py-1 rounded-md bg-black
        bg-gradient-to-t from-${color} to-40% text-${color}`} ref={ref} {...props}>
            {props.children}
            <p>{text}</p>
        </div>
    </div>

));
ShinyBadge.displayName = "ShinyBadge";

export {ShinyBadge};