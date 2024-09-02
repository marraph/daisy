"use client";

import React, {forwardRef, useRef} from "react";
import { cn } from "../../utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text?: string;
    textClassname?: string;
}

type CheckboxRef = HTMLInputElement & {
    getValue: () => boolean;
    setValue: (value: boolean) => void;
}

const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(({ text, textClassname, className, ...props }, ref) => {
    const checkboxRef = useRef<CheckboxRef>(null);

    React.useImperativeHandle(ref, () => ({
        getValue: () => checkboxRef.current.checked,
        setValue: (value: boolean) => {
            checkboxRef.current.checked = value;
        },
        ...checkboxRef.current,
    }), [checkboxRef]);

    return (
        <div className={"w-max font-medium flex items-center p-2 text-black-light dark:text-white"}>
            <input type={"checkbox"}
                   ref={checkboxRef}
                   className={cn("size-4 accent-black border-edge rounded-md mr-2 checked:accent-black", className)}
                   {...props}
            />
            {text &&
                <span className={cn(textClassname)}>{text}</span>
            }
        </div>
    );
});
Checkbox.displayName = "Checkbox";

export {Checkbox, CheckboxRef};