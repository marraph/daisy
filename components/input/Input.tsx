"use client";

import React, {forwardRef, ReactNode, useImperativeHandle, useRef} from "react";
import { cn } from "../../utils/cn";
import {cva, VariantProps} from "class-variance-authority";

const input = cva("group/input w-auto rounded-lg font-normal text-gray bg-black-light focus:text-white placeholder-marcador focus-visible:outline-none focus-visible:ring-0", {
    variants: {
        border: {
            default: ["bg-black-light", "border", "border-edge", "outline-none", "focus:ring-2", "focus:ring-marcador"],
            none: ["border-0"],
        },
        elementSize: {
            small: ["text-xs", "py-1", "px-2"],
            medium: ["text-sm", "py-1.5", "px-3"],
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
    icon?: ReactNode;
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
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-marcador text-xs"}>
                    {label}
                </span>
            }

            <div className={"flex flex-row items-center"}>
                {icon &&
                    <div className={cn("bg-black-light border border-edge border-r-0 rounded-l-lg text-gray",
                        elementSize === "medium" ? "p-2" : "p-1.5")}>
                        {icon}
                    </div>
                }
                <input className={cn(input({ border, elementSize }), {"rounded-l-none border-l-0 pl-1": icon}, className)}
                       placeholder={placeholder}
                       spellCheck={false}
                       ref={inputRef}
                       value={inputValue}
                       onChange={(e) => handleOnChange(e)}
                       size={Math.max((inputValue as string).length, placeholder.length)}
                       {...props}
                >
                </input>
            </div>
        </div>
    );
});
Input.displayName = "Input";

export { Input, InputRef };