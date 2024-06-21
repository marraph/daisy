"use client";

import React, {useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
}

type TextareaRef = HTMLTextAreaElement & {
    reset: () => void;
    getValue: () => string | null;
    setValue: (value: string) => void;
};

const Textarea = React.forwardRef<TextareaRef, TextareaProps>(({ placeholder, className, ...props }, ref) => {
    const [value, setValue] = useState<string | null>(null);

    const textareaRef = useRef<TextareaRef>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setValue(null),
        getValue: () => value,
        setValue: (value) => setValue(value),
        ...textareaRef.current,
    }));

    return (
        <textarea placeholder={placeholder}
                  className={cn("bg-dark rounded-lg border-none text-gray focus:text-white focus:outline-none overflow-hidden resize-none", className)}
                  ref={textareaRef} {...props}>
        </textarea>
    );
});
Textarea.displayName = "Textarea";

export {Textarea, TextareaRef};