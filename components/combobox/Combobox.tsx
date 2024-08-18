"use client";

import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {useOutsideClick} from "../../utils/clickOutside";
import {cva, VariantProps} from "class-variance-authority";
import {CustomScroll} from "react-custom-scroll";

const combobox = cva(
    "group/combo flex flex-row items-center cursor-pointer rounded-lg font-normal overflow-hidden " +
    "bg-zinc-200 dark:bg-black-light text-zinc-700 dark:text-gray border border-zinc-300 dark:border-edge", {
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

const comboboxItem = cva(
    "flex flex-row items-center cursor-pointer rounded-lg mx-1 bg-zinc-200 dark:bg-black-light " +
    "text-zinc-700 dark:text-gray hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-dark-light", {
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

interface ComboboxItemProps extends VariantProps<typeof comboboxItem> {
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
    children: ReactNode;
}

type ComboboxRef = HTMLDivElement & {
    reset: () => void;
    getValue: () => string | null;
    setValue: (value: string | null | undefined) => void;
};


const ComboboxItem: React.FC<ComboboxItemProps> = ({ size, title, isSelected, onClick }) => {
    return (
        <div className={cn(comboboxItem({size}), { "bg-zinc-100 dark:bg-dark-light text-zinc-800 dark:text-white": isSelected })}
             onClick={onClick}
        >
            {isSelected && <Check size={12} strokeWidth={3} className={"mr-2"}/>}
            <span>{title}</span>
        </div>
    );
}


const Combobox = forwardRef<ComboboxRef, ComboboxProps>(({ label, onValueChange, icon, size, buttonTitle, preSelectedValue, children, ...props }, ref) => {
    const comboRef = useRef<ComboboxRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(preSelectedValue || null);
    const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">("left");

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const spaceOnRight = window.innerWidth - rect.right;
            if (spaceOnRight < 300) {
                setDropdownPosition("right");
            } else {
                setDropdownPosition("left");
            }
        }
    }, [isOpen, menuRef]);

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
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-500 dark:text-marcador text-xs"}>{label}</span>
            }

            <div className={"relative space-y-1"} ref={menuRef}>
                <div className={cn(combobox({ size }))}
                     onClick={() => setIsOpen(!isOpen)}
                     {...props}
                >
                    {icon}
                    <span>{selectedValue ?? buttonTitle}</span>
                    <ChevronsUpDown className={"ml-2 text-zinc-700 dark:text-gray"} size={12}/>
                </div>
                {isOpen && React.Children.count(children) > 0 &&
                    <div className={cn("absolute z-50 max-h-48 w-max bg-zinc-200 dark:bg-black-light rounded-lg border border-zinc-300 dark:border-edge overflow-hidden shadow-2xl",
                        dropdownPosition === "left" ? "left-0" : "right-0")}
                    >
                        {React.Children.count(children) > (size === "medium" ?  4 : 6) ? (
                            <CustomScroll>
                                <div className={"max-h-48"}>
                                    <div className={"flex flex-col space-y-1 py-1 pr-1"}>
                                        {React.Children.map(children, (child, index) => {
                                            if (React.isValidElement<ComboboxItemProps>(child)) {
                                                return React.cloneElement(child, {
                                                    onClick: () => {
                                                        child.props.onClick && child.props.onClick();
                                                        handleItemClick(child.props.title);
                                                    },
                                                    isSelected: selectedValue === child.props.title,
                                                    key: index,
                                                    size: size
                                                });
                                            }
                                            return child;
                                        })}
                                    </div>
                                </div>
                            </CustomScroll>
                        ) : (
                            <div className={"flex flex-col space-y-1 py-1"}>
                                {React.Children.map(children, (child, index) => {
                                    if (React.isValidElement<ComboboxItemProps>(child)) {
                                        return React.cloneElement(child, {
                                            onClick: () => {
                                                child.props.onClick && child.props.onClick();
                                                handleItemClick(child.props.title);
                                            },
                                            isSelected: selectedValue === child.props.title,
                                            key: index,
                                            size: size
                                        });
                                    }
                                    return child;
                                })}
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
});
Combobox.displayName = "Combobox";

export {Combobox, ComboboxItem, ComboboxRef};
