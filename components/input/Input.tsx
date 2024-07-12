"use client";

import React, {forwardRef, useImperativeHandle, useRef} from "react";
import { cn } from "../../utils/cn";
import {cva, VariantProps} from "class-variance-authority";

const input = cva("group/input w-auto rounded-lg font-normal text-gray bg-black focus:text-white placeholder-placeholder focus-visible:outline-none focus-visible:ring-0", {
    variants: {
        border: {
            default: ["bg-black", "border", "border-white", "border-opacity-20", "outline-none", "focus:ring-2", "focus:ring-placeholder"],
            none: ["border-0",],
        },
        elementSize: {
            medium: ["text-base", "py-1", "px-4"],
            small: ["text-xs", "py-1", "px-2"],
        },
    },
    defaultVariants: {
        border: "default",
        elementSize: "medium"
    },
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    label?:  string;
    placeholder: string;
    icon?: React.ReactNode;
    preSelectedValue?: string | number | null | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputRef = HTMLInputElement & {
    reset: () => void;
    getValue: () => string | number | null;
    setValue: (value: string | number | null | undefined) => void;
    blur: () => void;
};

const Input = forwardRef<InputRef, InputProps>(({ onChange, preSelectedValue, icon, elementSize, border, label, placeholder, className, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string | number >(preSelectedValue || "");

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setInputValue(''),
        getValue: () => inputValue,
        setValue: (value) => {
            setInputValue(value);
            if (inputRef.current) {
                inputRef.current.value = value as string;
            }
        },
        blur: () => inputRef.current?.blur(),
        ...inputRef.current,
    }));

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    }

    return (
        <div className={cn("flex flex-col", className)}>
            {label && (
                <p className={cn("text-white font-normal m-1", elementSize === "medium" ? "text-base" : "text-xs", className)}>
                    {label}
                </p>
            )}
            <div className={cn("relative flex flex-row items-center", className)}>

                {icon && elementSize === "medium" &&
                    <div className={"bg-black border border-white border-opacity-20 border-r-0 p-2 rounded-l-lg text-gray"}>
                        {icon}
                    </div>
                }

                {icon && elementSize === "small" &&
                    <div className={"bg-black border border-white border-opacity-20 border-r-0 p-1.5 rounded-l-lg text-gray"}>
                        {icon}
                    </div>
                }

                <input className={cn(input({ border, elementSize }), icon && 'rounded-l-none border-l-0 pl-1', className)}
                       placeholder={placeholder} spellCheck={false} ref={inputRef} value={inputValue}
                       onChange={(e) => handleOnChange(e)}
                       size={Math.max((inputValue as string).length, placeholder.length)}
                       {...props}>
                </input>
            </div>
        </div>
    );
});
Input.displayName = "Input";

export { Input, InputRef };