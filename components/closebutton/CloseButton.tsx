"use client";

import React from "react";
import {cn} from "../../utils/cn";
import {ButtonProps} from "../button/Button";
import {X} from "lucide-react";

const CloseButton = React.forwardRef<HTMLDivElement, ButtonProps>(({ theme, className, ...props }) => (
    <button className={cn("group/close bg-black hover:bg-dark rounded-lg", className)} {...props}>
        <X size={16} className={"text-gray group-hover/close:text-white m-1"}/>
    </button>
));
CloseButton.displayName = "CloseButton";

export { CloseButton };