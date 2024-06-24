"use client";

import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
}

type TextareaRef = HTMLTextAreaElement & {
    reset: () => void;
    getValue: () => string | null;
    setValue: (value: string) => void;
};

const Textarea = forwardRef<TextareaRef, TextareaProps>(({ placeholder, className, ...props }, ref) => {
    const [textValue, setTextValue] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setTextValue(null),
        getValue: () => textValue,
        setValue: (value) => {
            setTextValue(value);
            if (textareaRef.current) {
                textareaRef.current.value = value as string;
            }
        },
        ...textareaRef.current,
    }));

    return (
        <textarea placeholder={placeholder} value={textValue}
                  className={cn("bg-dark rounded-lg border-none text-gray focus:text-white focus:outline-none overflow-hidden resize-none", className)}
                  ref={textareaRef} {...props}>
        </textarea>
    );
});
Textarea.displayName = "Textarea";

export {Textarea, TextareaRef};