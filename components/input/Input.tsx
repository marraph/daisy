"use client";

import React, {InputHTMLAttributes} from "react";
import {cn} from "../../utils/cn";
import {cva, VariantProps} from "class-variance-authority";
import {useInputValidation, ValidationRule} from "@/hooks/useInputValidation";
import {BadgeAlert, BadgeCheck, BadgeX} from "lucide-react";

const inputContainer = cva(
    "flex items-center w-full rounded-lg bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray",
    {
        variants: {
            border: {
                default: "border border-zinc-300 dark:border-edge",
                none: "border-0",
            },
            elementSize: {
                small: "text-xs",
                medium: "text-sm",
            },
        },
        defaultVariants: {
            border: "default",
            elementSize: "medium",
        },
    }
);

const input = cva(
    "peer w-full rounded-lg font-normal focus-visible:outline-none focus-visible:ring-0 " +
    "text-zinc-700 dark:text-gray focus:text-zinc-800 dark:focus:text-white " +
    "placeholder-zinc-500 dark:placeholder-marcador bg-transparent",
    {
        variants: {
            border: {
                default: "",
                none: "",
            },
            elementSize: {
                small: "py-1 px-2",
                medium: "py-1.5 px-3",
            },
        },
        defaultVariants: {
            border: "default",
            elementSize: "medium",
        },
    }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputContainer> {
    label?: string;
    placeholder: string;
    icon?: React.ReactNode;
    preSelectedValue?: string | number | null | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    successMessage?: string;
    warningMessage?: string;
    validationRules?: ValidationRule[];
    warningBuffer?: number;
}

const Input: React.FC<InputProps> = ({ onChange, preSelectedValue, icon, elementSize, border = "default", label, placeholder, successMessage, warningMessage, validationRules, warningBuffer, className, ...props }) => {
    const { value, setValue, status, message, validateInput } = useInputValidation({
        initialValue: preSelectedValue?.toString() || '',
        validationRules,
        successMessage,
        warningMessage,
        warningBuffer
    });

    const handleOnBlur = () => {
        validateInput();
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange?.(e);
    }

    return (
        <div className="flex flex-col space-y-1">
            {label && (
                <span className="ml-1 text-zinc-400 dark:text-marcador text-xs">
                    {label}
                </span>
            )}

            <div className={cn(inputContainer({border, elementSize}),
                    status === 'success' && border === 'default' && "focus-within:border-success dark:focus-within:border-success",
                    status === 'warning' && border === 'default' && "focus-within:border-warning dark:focus-within:border-warning",
                    status === 'error' && border === 'default' && "focus-within:border-error dark:focus-within:border-error",
                    status == 'idle' && border === 'default' && "focus-within:border-zinc-500 dark:focus-within:border-white-dark",
                    className)}
            >
                {icon &&
                    <div className={cn("flex items-center justify-center", elementSize === "medium" ? "p-2 pr-0" : "p-1.5 pr-0")}>
                        {icon}
                    </div>
                }
                <input
                    className={cn(input({elementSize}))}
                    placeholder={placeholder}
                    spellCheck={false}
                    value={value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    {...props}
                />
            </div>

            {status !== 'idle' && (
                <div
                    className={cn("ml-1 flex flex-row items-center space-x-1 text-xs",
                        status === 'success' && "text-success",
                        status === 'warning' && "text-warning",
                        status === 'error' && "text-error"
                    )}
                >
                    {status === 'success' && <BadgeCheck size={12} />}
                    {status === 'warning' && <BadgeAlert size={12} />}
                    {status === 'error' && <BadgeX size={12} />}
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
}

export {Input};