"use client";

import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {Input, InputRef} from "../input/Input";
import {handleInternalServerErrorResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";

const searchselect = cva("group/combo cursor-pointer text-gray whitespace-nowrap rounded-lg font-normal flex flex-row items-center " +
    "hover:text-white border border-edge overflow-hidden bg-black", {
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

const searchselectItem = cva("text-gray cursor-pointer rounded-lg hover:bg-dark hover:text-white flex items-center mx-1 bg-black", {
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

interface SearchSelectItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof searchselectItem> {
    title: string;
    isSelected?: boolean;
    highlight?: string;
    onClick?: () => void;
}

interface SearchSelectProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof searchselect> {
    buttonTitle: string;
    label?: string;
    preSelectedValue?: string | null | undefined;
    icon?: ReactNode;
    onValueChange?: (value: string) => void;
}

type SearchSelectRef = HTMLInputElement & {
    reset: () => void;
    getSelectedValue: () => string | null;
    setValue: (value: string | null | undefined) => void;
};

const SearchSelectItem = forwardRef<HTMLDivElement, SearchSelectItemProps>(({ highlight, size, title, isSelected, onClick, className, ...props }, ref) => {
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <div className={cn(searchselectItem({size}), className, (isSelected) ? "bg-dark text-white" : "bg-black")}
             ref={ref} {...props} onClick={onClick}>
            {(isSelected) && <Check size={12} strokeWidth={3} className={"mr-2"}/>}
            <div className={"flex flex-row justify-between items-center w-full"}>
                <span>
                    {parts.map((part, index) => (
                        part.toLowerCase() === highlight?.toLowerCase() ? (
                            <span key={index} className="text-white">{part}</span>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    ))}
                </span>
                {props.children}
            </div>
        </div>
    )
});
SearchSelectItem.displayName = "SearchSelectItem";


const SearchSelect = forwardRef<SearchSelectRef, SearchSelectProps>(({label, onValueChange, icon, size,  buttonTitle, preSelectedValue, className, ...props}, ref) => {
    const inputRef = useRef<InputRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(preSelectedValue || null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const previousSearchTerm = useRef<string>("");

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleItemClick = (item: string) => {
        const newValue = (selectedValue === item) ? "" : item;
        setSelectedValue(newValue);
        setSearchTerm(newValue)
        setIsOpen(false);
        onValueChange && onValueChange(newValue)
    };

    const searchselectRef = useRef<SearchSelectRef>(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelectedValue(null);
            setSearchTerm("");
            inputRef.current?.setValue("");
        },
        getSelectedValue: () => selectedValue,
        setValue: (value: string) => {
            setSelectedValue(value);
            setSearchTerm(value);
            if (inputRef.current) inputRef.current.setValue(value);
        },
        ...searchselectRef.current,
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value != selectedValue) {
            setSelectedValue(null);
        }
    };

    const filteredChildren = React.Children.toArray(props.children).filter((child) => {
        if (React.isValidElement<SearchSelectItemProps>(child)) {
            return child.props.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    useEffect(() => {
        if (filteredChildren.length === 1 && searchTerm.length > previousSearchTerm.current.length) {
            const singleChild = filteredChildren[0];
            if (React.isValidElement<SearchSelectItemProps>(singleChild)) {
                setSelectedValue(singleChild.props.title);
                setSearchTerm(singleChild.props.title);
                inputRef.current?.setValue(singleChild.props.title);
                inputRef.current?.blur();
                setIsOpen(false);
            }
        }
        previousSearchTerm.current = searchTerm;
    }, [filteredChildren, searchTerm]);

    return (
        <div className={cn("flex flex-col relative space-y-1", className)} ref={menuRef}>
            {label &&
                <span className={"ml-1 text-marcador text-xs"}>{label}</span>
            }
            <div className={cn(searchselect({ size }), className)} {...props} onClick={() => setIsOpen(true)}>
                {icon}
                <Input placeholder={buttonTitle}
                       value={searchTerm}
                       border={"none"}
                       elementSize={size}
                       onChange={handleInputChange}
                       size={Math.max((searchTerm as string).length/100*90, buttonTitle.length/100*90)}
                       ref={inputRef}
                />
                <ChevronsUpDown className={cn("group-hover/combo:text-white text-gray", className)} size={12} />
            </div>
            {isOpen && filteredChildren.length > 0 &&
                <div className={cn("absolute top-full min-w-max bg-black border border-edge text-gray whitespace-nowrap rounded-lg py-1 space-y-1 overflow-hidden", className)}>
                    {filteredChildren.map((child, index) => {
                        if (React.isValidElement<SearchSelectItemProps>(child)) {
                            return React.cloneElement(child, {
                                onClick: () => {
                                    child.props.onClick && child.props.onClick();
                                    handleItemClick(child.props.title);
                                },
                                isSelected: selectedValue === child.props.title,
                                key: index,
                                highlight: searchTerm,
                            });
                        }
                        return child;
                    })}
                </div>
            }
        </div>
    );
});
SearchSelect.displayName = "SearchSelect";

export { SearchSelect, SearchSelectItem, SearchSelectRef };