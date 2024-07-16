"use client";

import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {useOutsideClick} from "../../utils/clickOutside";
import {cva, VariantProps} from "class-variance-authority";
import {CustomScroll} from "react-custom-scroll";

const combobox = cva("group/combo cursor-pointer text-gray whitespace-nowrap rounded-lg font-normal flex items-center " +
    "hover:text-white border border-edge overflow-hidden bg-black", {
    variants: {
        size: {
            small: ["text-xs", "py-1", "px-2"],
            medium: ["text-sm", "py-1.5", "px-3"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const comboboxItem = cva("text-gray text-sm cursor-pointer rounded-lg hover:bg-dark hover:text-white flex items-center mx-1 bg-black", {
    variants: {
        size: {
            small: ["text-xs", "p-1"],
            medium: ["text-sm", "p-2"],
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

interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof combobox> {
    buttonTitle: string;
    preSelectedValue?: string | null | undefined;
    icon?: ReactNode;
    onValueChange?: (value: string | null) => void;
    label?: string;
}

type ComboboxRef = HTMLDivElement & {
    reset: () => void;
    getValue: () => string | null;
    setValue: (value: string | null | undefined) => void;
};


const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(({ size, title, isSelected, onClick, className, ...props }, ref) => (
    <div className={cn(comboboxItem({size}), className, (isSelected) ? "bg-dark text-white" : "bg-black")} ref={ref} {...props} onClick={onClick}>
        {(isSelected) && <Check size={12} strokeWidth={3} className={"mr-2"}/>}
        <div className={"flex flex-row justify-between items-center w-full"}>
            <span>{title}</span>
            {props.children}
        </div>
    </div>
));
ComboboxItem.displayName = "ComboboxItem";


const Combobox = forwardRef<ComboboxRef, ComboboxProps>(({label, onValueChange, icon, size, buttonTitle, preSelectedValue, className, ...props}, ref) => {
    const comboRef = useRef<ComboboxRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(preSelectedValue || null);

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleItemClick = (item: string) => {
        const newValue = (selectedValue === item) ? null : item;
        setSelectedValue(newValue);
        setIsOpen(false);
        onValueChange && onValueChange(newValue);
    };

    useImperativeHandle(ref, () => ({
        reset: () => setSelectedValue(null),
        getValue: () => selectedValue,
        setValue: (value: string) => setSelectedValue(value),
        ...comboRef.current,
    }));

    return (
        <div className={"flex flex-col space-y-1 isolate"}>
            {label &&
                <span className={"ml-1 text-marcador text-xs"}>{label}</span>
            }

            <div className={cn("space-y-1", className)} ref={menuRef}>
                <div className={cn(combobox({size}), className)} {...props} onClick={() => setIsOpen(!isOpen)}>
                    {icon}
                    <span>{selectedValue ?? buttonTitle}</span>
                    <ChevronsUpDown className={cn("group-hover/combo:text-white ml-2 text-gray", className)} size={12}/>
                </div>
                {isOpen && React.Children.count(props.children) > 0 && (
                    <div className={"fixed z-50 min-w-max"}>

                    <CustomScroll>
                        <div className={"max-h-48"}>
                            <div className={"flex flex-col text-gray bg-black rounded-lg border border-edge space-y-1 py-1"}>
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
                        </div>
                    </CustomScroll>
                    </div>
                )}
            </div>
        </div>
    );
});
Combobox.displayName = "Combobox";

export {Combobox, ComboboxItem, ComboboxRef};
