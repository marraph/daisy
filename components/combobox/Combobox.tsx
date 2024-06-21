"use client";

import React, {ReactNode, useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {useOutsideClick} from "../../utils/clickOutside";
import {cva, VariantProps} from "class-variance-authority";

const combobox = cva("group/combo cursor-pointer text-gray whitespace-nowrap rounded-lg font-normal flex items-center " +
    "hover:text-white border border-white border-opacity-20 overflow-hidden bg-black", {
    variants: {
        size: {
            small: ["text-xs", "py-1", "px-2"],
            medium: ["text-sm", "py-2", "px-4"],
            large: ["text-base", "py-3", "px-6"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const comboboxItem = cva("text-gray text-sm cursor-pointer rounded-lg hover:bg-selected hover:text-white flex items-center mx-1 bg-black", {
    variants: {
        size: {
            small: ["text-xs", "p-2"],
            medium: ["text-sm", "p-3"],
            large: ["text-base", "p-4"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof comboboxItem> {
    title: string;
    isSelected?: boolean;
    onClick?: () => void;
}

interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof combobox> {
    buttonTitle: string;
    preSelectedValue?: string | null | undefined;
    icon?: ReactNode;
}

type ComboboxRef = HTMLDivElement & {
    reset: () => void;
    getValue: () => string | null;
    setValue: (value: string | null | undefined) => void;
};


const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(({ size, title, isSelected, onClick, className, ...props }, ref) => (
    <div className={cn(comboboxItem({size}), className, (isSelected) ? "bg-dark text-white" : "bg-black")} ref={ref} {...props} onClick={onClick}>
        {(isSelected) && <Check size={12} strokeWidth={3} className={"mr-2"}/>}
        <div className={"flex flex-row justify-between items-center w-full"}>
            <span>{title}</span>
            {props.children}
        </div>
    </div>
));
ComboboxItem.displayName = "ComboboxItem";



const Combobox = React.forwardRef<ComboboxRef, ComboboxProps>(({icon, size, buttonTitle, preSelectedValue, className, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(preSelectedValue || null);

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleItemClick = (item: string) => {
        if (selectedValue === item) {
            setSelectedValue(null);
        } else {
            setSelectedValue(item);
        }
        setIsOpen(false);
    };

    const comboRef = useRef<ComboboxRef>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setSelectedValue(null),
        getValue: () => selectedValue,
        setValue: (value: string) => setSelectedValue(value),
        ...comboRef.current,
    }));

    return (
        <div className={cn("relative space-y-1", className)} ref={menuRef}>
            <div className={cn(combobox({ size }), className)} {...props} onClick={() => setIsOpen(!isOpen)}>
                {icon}
                <span>{selectedValue ?? buttonTitle}</span>
                <ChevronsUpDown className={cn("group-hover/combo:text-white ml-2 text-gray", className)} size={12} />
            </div>
            {isOpen && React.Children.count(props.children) > 0 && (
                <div className={cn("absolute top-full min-w-max bg-black border border-white border-opacity-20 text-gray whitespace-nowrap rounded-lg py-1 space-y-1 overflow-hidden", className)}>
                    {React.Children.map(props.children, (child, index) => {
                        if (React.isValidElement<ComboboxItemProps>(child)) {
                            return React.cloneElement(child, {
                                onClick: () => {
                                    child.props.onClick && child.props.onClick();
                                    handleItemClick(child.props.title);
                                },
                                isSelected: selectedValue === child.props.title,
                                key: index
                            });
                        }
                        return child;
                    })}
                </div>
            )}
        </div>
    );
});
Combobox.displayName = "Combobox";

export { Combobox, ComboboxItem, ComboboxRef };
