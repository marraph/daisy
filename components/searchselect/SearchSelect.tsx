"use client";

import React, {ForwardedRef, forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {Input, InputRef} from "../input/Input";
import {handleInternalServerErrorResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";
import {CustomScroll} from "react-custom-scroll";
import {ComboboxRef} from "@/components/combobox/Combobox";

const searchselect = cva(
    "group/combo flex flex-row items-center cursor-pointer rounded-lg font-normal overflow-hidden " +
    "bg-zinc-200 dark:bg-black-light text-zinc-700 dark:text-gray border border-zinc-300 dark:border-edge", {
    variants: {
        size: {
            small: ["text-xs", "px-2"],
            medium: ["text-sm", "px-3"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const searchselectItem = cva(
    "flex flex-row items-center cursor-pointer rounded-lg mx-1 bg-zinc-200 dark:bg-black-light " +
    "text-zinc-600 dark:text-gray hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-dark-light", {
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

interface SearchSelectItemProps<T> extends VariantProps<typeof searchselectItem> {
    title: string;
    value: T;
    isSelected?: boolean;
    highlight?: string;
    onClick?: () => void;
}

interface SearchSelectProps<T> extends VariantProps<typeof searchselect> {
    buttonTitle: string;
    children: ReactNode;
    label?: string;
    preSelectedValue?: T;
    icon?: ReactNode;
    getItemTitle: (item: T) => string;
    onValueChange?: (value: T) => void;
}

type SearchSelectRef<T> = HTMLInputElement & {
    reset: () => void;
    getSelectedValue: () => T | null;
    setValue: (value: T | null) => void;
};

const SearchSelectItem = <T,>({ size, title, value, highlight, isSelected, onClick }: SearchSelectItemProps<T>) => {
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <div className={cn(searchselectItem({size}), { "bg-zinc-100 dark:bg-dark-light text-zinc-800 dark:text-white" : isSelected })} onClick={onClick}>
            {isSelected && <Check size={12} strokeWidth={3} className={"mr-2"}/>}
            <span>
                {parts.map((part, index) => (
                    part.toLowerCase() === highlight?.toLowerCase() ? (
                        <span key={index} className="text-zinc-900 dark:text-white">{part}</span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                ))}
            </span>
        </div>
    );
}


const SearchSelect = forwardRef(<T,>({ label, onValueChange, icon, size, buttonTitle, preSelectedValue, children, getItemTitle, ...props }: SearchSelectProps<T>, ref: ForwardedRef<SearchSelectRef<T>>) => {
    const inputRef = useRef<InputRef>(null);
    const searchselectRef = useRef<SearchSelectRef<T>>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<T | null>(preSelectedValue || null);
    const [searchTerm, setSearchTerm] = useState<string>(preSelectedValue ? getItemTitle(preSelectedValue) : "");
    const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">("left");
    const previousSearchTerm = useRef<string>("");

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

    const handleItemClick = (item: T) => {
        const newValue = (selectedValue === item) ? null : item;
        setSelectedValue(newValue);
        setSearchTerm(newValue ? getItemTitle(newValue) : "")
        setIsOpen(false);
        onValueChange && onValueChange(newValue);
    };

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelectedValue(null);
            setSearchTerm("");
            inputRef.current?.setValue("");
        },
        getSelectedValue: () => selectedValue,
        setValue: (value: T | null) => {
            setSelectedValue(value);
            setSearchTerm(value ? getItemTitle(value) : "");
            if (inputRef.current) inputRef.current.setValue(value ? getItemTitle(value) : "");
        },
        ...searchselectRef.current,
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value != selectedValue) {
            setSelectedValue(null);
        }
        onValueChange && onValueChange(null as unknown as T);

    };

    const filteredChildren = React.Children.toArray(children).filter((child) => {
        if (React.isValidElement<SearchSelectItemProps<T>>(child)) {
            return child.props.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    useEffect(() => {
        if (filteredChildren.length === 1 && searchTerm.length > previousSearchTerm.current.length) {
            const singleChild = filteredChildren[0];
            if (React.isValidElement<SearchSelectItemProps<T>>(singleChild)) {
                onValueChange && onValueChange(singleChild.props.value);
                setSelectedValue(singleChild.props.value);
                setSearchTerm(singleChild.props.title);
                inputRef.current?.setValue(singleChild.props.title);
                inputRef.current?.blur();
                setIsOpen(false);
            }
        }
        previousSearchTerm.current = searchTerm;
    }, [filteredChildren, onValueChange, searchTerm]);

    return (
        <div className={"flex flex-col space-y-1"} ref={menuRef}>
            {label &&
                <span className={"ml-1 text-zinc-500 dark:text-marcador text-xs"}>{label}</span>
            }

            <div className={"relative space-y-1"} ref={menuRef}>
                <div className={cn(searchselect({ size }))}
                     onClick={() => setIsOpen(true)}
                     {...props}
                >
                    {icon}
                    <Input placeholder={buttonTitle}
                           value={searchTerm}
                           border={"none"}
                           elementSize={size}
                           onChange={handleInputChange}
                           size={Math.max((searchTerm as string).length/100*90, buttonTitle.length/100*90)}
                           ref={inputRef}
                    />
                    <ChevronsUpDown className={"text-zinc-700 dark:text-gray"} size={12} />
                </div>
                {isOpen && filteredChildren.length > 0 &&
                    <div className={cn("absolute z-50 max-h-48 w-max bg-zinc-200 dark:bg-black-light rounded-lg border border-zinc-300 dark:border-edge overflow-hidden",
                        dropdownPosition === "left" ? "left-0" : "right-0")}
                    >
                        {filteredChildren.length > (size === "medium" ? 4 : 6) ? (
                            <CustomScroll>
                                <div className={"max-h-48"}>
                                    <div className={"flex flex-col text-zinc-500 dark:text-gray space-y-1 pr-1 py-1"}>
                                        {filteredChildren.map((child, index) => {
                                            if (React.isValidElement<SearchSelectItemProps<T>>(child)) {
                                                return React.cloneElement(child, {
                                                    onClick: () => {
                                                        child.props.onClick && child.props.onClick();
                                                        handleItemClick(child.props.value);
                                                    },
                                                    isSelected: selectedValue === child.props.value,
                                                    key: index,
                                                    highlight: searchTerm,
                                                    size: size
                                                });
                                            }
                                            return child;
                                        })}
                                    </div>
                                </div>
                            </CustomScroll>
                        ) : (
                            <div className={"flex flex-col text-zinc-500 dark:text-gray space-y-1 py-1"}>
                                {filteredChildren.map((child, index) => {
                                    if (React.isValidElement<SearchSelectItemProps<T>>(child)) {
                                        return React.cloneElement(child, {
                                            onClick: () => {
                                                child.props.onClick && child.props.onClick();
                                                handleItemClick(child.props.value);
                                            },
                                            isSelected: selectedValue === child.props.value,
                                            key: index,
                                            highlight: searchTerm,
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
SearchSelect.displayName = "SearchSelect";

export { SearchSelect, SearchSelectItem, SearchSelectRef };