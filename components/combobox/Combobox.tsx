"use client";

import React, {ReactNode, useState} from "react";
import { cn } from "../../utils/cn";
import {ChevronsUpDown} from "lucide-react";
import {useOutsideClick} from "../../utils/clickOutside";
import {cva, VariantProps} from "class-variance-authority";

const combobox = cva("group/combo cursor-pointer text-gray whitespace-nowrap rounded-lg font-normal text-sm flex items-center " +
    "bg-black hover:text-white border border-white border-opacity-20 overflow-hidden", {
    variants: {
        theme: {
            dark: ["bg-black"],
            light: ["bg-dark"],
        },
        size: {
            small: ["text-xs", "py-1", "px-2"],
            medium: ["text-sm", "py-2", "px-4"],
            large: ["text-base", "py-3", "px-6"],
        },
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
    },
});

const comboboxItem = cva("bg-black text-gray text-sm cursor-pointer rounded-lg hover:bg-selected hover:text-white p-2 flex items-center", {
    variants: {
        theme: {
            dark: ["bg-black"],
            light: ["bg-dark"],
        },
        size: {
            small: ["text-xs", "p-1"],
            medium: ["text-sm", "p-2"],
            large: ["text-base", "p-3"],
        },
    },
    defaultVariants: {
        theme: "dark",
        size: "medium",
    },
});

interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof comboboxItem> {
    title: string;
    isSelected?: boolean;
}

interface ComboboxIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof combobox> {
    buttonTitle: string;
}

const ComboboxIcon = React.forwardRef<HTMLDivElement, ComboboxIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("mr-2", className)} ref={ref} {...props}>
        {icon}
    </div>
));
ComboboxIcon.displayName = "ComboboxIcon";


const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(({ theme, size, title, isSelected, className, ...props }, ref) => (
    <div className={cn(comboboxItem({theme, size}), className, isSelected ? "bg-white" : "bg-black")} ref={ref} {...props}>
        {props.children}
        <span className={cn("ml-1", className)}>{title}</span>
    </div>
));
ComboboxItem.displayName = "ComboboxItem";


const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(({theme, size, buttonTitle, className, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(null);

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleItemClick = (item: string) => {
        setSelectedValue(item);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)} ref={menuRef}>
            <div className={cn(combobox({theme, size}), className)} {...props} onClick={() => {setIsOpen(!isOpen)}}>
                <span>{!selectedValue ? buttonTitle : selectedValue}</span>
                <ChevronsUpDown className={cn("group-hover/combo:text-white ml-2 text-gray", className)} size={12}/>
            </div>
            {isOpen && (
                <div className={cn("absolute top-full w-min flex flex-col text-gray whitespace-nowrap", className)}>
                    {React.Children.map(props.children, (child) => {
                        if (React.isValidElement<ComboboxItemProps>(child)) {
                            return React.cloneElement(child, {
                                onClick: () => handleItemClick(child.props.title),
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

export { Combobox, ComboboxItem, ComboboxIcon };
