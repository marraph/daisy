"use client";

import React, {ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {Input, InputRef} from "../input/Input";
import {handleInternalServerErrorResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";

const searchselect = cva("group/combo cursor-pointer text-gray whitespace-nowrap rounded-lg font-normal flex flex-row items-center " +
    "hover:text-white border border-white border-opacity-20 overflow-hidden bg-black", {
    variants: {
        size: {
            small: ["text-xs", "px-2"],
            medium: ["text-sm", "px-4"],
            large: ["text-base", "px-6"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const searchselectItem = cva("text-gray text-sm cursor-pointer rounded-lg hover:bg-selected hover:text-white flex items-center mx-1 bg-black", {
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

interface SearchSelectItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof searchselectItem> {
    title: string;
    isSelected?: boolean;
    highlight?: string;
    onClick?: () => void;
}

interface SearchSelectProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof searchselect> {
    buttonTitle?: string;
    preSelectedValue?: string | null | undefined;
    width?: number;
    icon?: ReactNode;
}

type SearchSelectRef = HTMLInputElement & {
    reset: () => void;
    getSelectedValue: () => string | null;
    setValue: (value: string | null | undefined) => void;
};

const SearchSelectItem = React.forwardRef<HTMLDivElement, SearchSelectItemProps>(({ highlight, size, title, isSelected, onClick, className, ...props }, ref) => {
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


const SearchSelect = React.forwardRef<HTMLDivElement, SearchSelectProps>(({icon, size, width,  buttonTitle, preSelectedValue, className, ...props}, ref) => {
    const inputRef = useRef<InputRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(preSelectedValue || null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const previousSearchTerm = useRef<string>("");

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleItemClick = (item: string) => {
        if (selectedValue === item) {
            setSelectedValue(null);
            setSearchTerm("");
            inputRef.current?.setValue("");
        } else {
            setSelectedValue(item);
            setSearchTerm(item);
        }
        setIsOpen(false);
    };

    const searchselectRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelectedValue(null);
            setSearchTerm("");
            inputRef.current?.setValue("");
        },
        getSelectedValue: () => selectedValue,
        setValue: (value: string | null) => {
            setSelectedValue(value);
            setSearchTerm(value || "");
            if (inputRef.current) inputRef.current.setValue(value || "");
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
            }
        }
        previousSearchTerm.current = searchTerm;
    }, [filteredChildren, searchTerm]);

    return (
        <div className={cn("relative space-y-1", className)} ref={menuRef}>
            <div className={cn(searchselect({ size }), className)} {...props} onClick={() => setIsOpen(true)}>
                {icon}
                <Input placeholder={buttonTitle} value={searchTerm} border={"none"} className={`w-[${width}]`}
                       onChange={handleInputChange} ref={inputRef}>
                </Input>
                <ChevronsUpDown className={cn("group-hover/combo:text-white ml-2 text-gray", className)} size={12} />
            </div>
            {isOpen && React.Children.count(props.children) > 0 &&
                <div className={cn("absolute top-full min-w-max bg-black border border-white border-opacity-20 text-gray whitespace-nowrap rounded-lg py-1 space-y-1 overflow-hidden", className)}>
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