"use client";

import React from "react";
import {cn} from "../../utils/cn";

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ placeholder, className, ...props }, ref) => (
    <textarea placeholder={placeholder}
              className={cn("bg-dark rounded-lg border-none text-gray focus:text-white focus:outline-none overflow-hidden resize-none", className)}
              ref={ref} {...props}>
    </textarea>
));
Textarea.displayName = "Textarea";

export { Textarea };