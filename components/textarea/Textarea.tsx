"use client";

import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
    label?: string;
}

type TextareaRef = HTMLTextAreaElement & {
    reset: () => void;
    getValue: () => string | null;
    setValue: (value: string) => void;
};

const Textarea = forwardRef<TextareaRef, TextareaProps>(({ label, placeholder, className, ...props }, ref) => {
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
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-marcador text-xs"}>{label}</span>
            }
            <textarea placeholder={placeholder}
                      value={textValue}
                      className={cn("p-2 text-sm placeholder-marcador bg-dark rounded-lg border-none text-gray focus:text-gray focus:outline-none overflow-hidden resize-none", className)}
                      ref={textareaRef}
                      spellCheck={false}
                      {...props}
            />
        </div>
    );
});
Textarea.displayName = "Textarea";

export {Textarea, TextareaRef};