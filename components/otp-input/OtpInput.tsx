"use client";

import React, {InputHTMLAttributes, ReactNode, useState} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/utils/cn";

const input = cva("bg-zinc-100 dark:bg-black-light focus:outline-none text-center " +
    "border-r border-zinc-300 dark:border-edge focus-visible:outline-none focus-visible:ring-0 " +
    "text-zinc-700 dark:text-gray focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador", {
    variants: {
        inputSize: {
            sm: "h-8 w-8",
            md: "h-12 w-12",
            lg: "h-16 w-16",
        },
    },
    defaultVariants: {
        inputSize: "md",
    }
});

interface OtpInputProps {
    label?: string;
    children: ReactNode;
}

interface OtpInputSlotProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    onValueChange?: (value: string) => void;
    index?: number;
    groupMembers?: number;
}

interface OtpInputGroupProps {
    children: ReactNode;
}

const OtpInputSlot: React.FC<OtpInputSlotProps> = ({ index, groupMembers, inputSize, onValueChange, ...props }) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);
        onValueChange?.(value);
    }

    return (
        <input
            type={"text"}
            value={value}
            onChange={handleChange}
            size={1}
            maxLength={1}
            className={cn(input({ inputSize }),
               index === 0 ? "rounded-l-lg" :
               index === groupMembers - 1 ? "rounded-r-lg border-r-none" : ""
            )}
            {...props}
        />
    );
}

const OtpInputGroup: React.FC<OtpInputGroupProps> = ({ children }) => {
    return (
        <div className={"w-max flex flex-row rounded-lg border border-zinc-300 dark:border-edge"}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<OtpInputSlotProps>(child)) {
                    return React.cloneElement(child, {
                        onChange: child.props.onChange,
                        value: child.props.value,
                        groupMembers: React.Children.count(children),
                        index: index
                    });
                }
            })}
        </div>
    );
}

const OtpInput: React.FC<OtpInputProps> = ({ label, children }) => {
    return (
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-400 dark:text-marcador text-xs"}>{label}</span>
            }

            <div className={"w-max flex flex-row space-x-2"}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement<OtpInputGroupProps>(child)) {
                        return React.cloneElement(child);
                    }
                })}
            </div>
        </div>
    )
}

export {
    OtpInput,
    OtpInputGroup,
    OtpInputSlot
};
