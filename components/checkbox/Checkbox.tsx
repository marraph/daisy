"use client";

import React, {useRef} from "react";
import { cn } from "../../utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
}

type CheckboxRef = HTMLInputElement & {
    getValue: () => boolean;
    setValue: (value: boolean) => void;
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(({ text, className, ...props }, ref) => {
    const checkboxRef = useRef<CheckboxRef>(null);

    React.useImperativeHandle(ref, () => ({
        getValue: () => checkboxRef.current.checked,
        setValue: (value: boolean) => {
            checkboxRef.current.checked = value;
        },
        ...checkboxRef.current,
    }), [checkboxRef]);

    return (
        <div className={cn("w-max font-normal flex items-center p-2 text-white", className)} {...props}>
            <input type={"checkbox"} ref={checkboxRef}
                   className={cn("size-4 accent-black border-gray border-opacity-20 " +
                       "rounded-md mr-2 checked:accent-black", className)}/>
            <p>{text}</p>
        </div>
    );
});
Checkbox.displayName = "Checkbox";

export {Checkbox, CheckboxRef};