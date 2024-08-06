"use client";

import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {Input, InputRef} from "../input/Input";
import {handleInternalServerErrorResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";
import {CustomScroll} from "react-custom-scroll";

const searchselect = cva("group/combo flex flex-row items-center cursor-pointer text-gray rounded-lg font-normal " +
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

const searchselectItem = cva("flex flex-row items-center text-gray cursor-pointer rounded-lg hover:bg-dark hover:text-white mx-1 bg-black", {
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

interface SearchSelectItemProps extends VariantProps<typeof searchselectItem> {
    title: string;
    isSelected?: boolean;
    highlight?: string;
    onClick?: () => void;
}

interface SearchSelectProps extends VariantProps<typeof searchselect> {
    buttonTitle: string;
    label?: string;
    preSelectedValue?: string | null | undefined;
    icon?: ReactNode;
    onValueChange?: (value: string) => void;
    children: ReactNode;
}

type SearchSelectRef = HTMLInputElement & {
    reset: () => void;
    getSelectedValue: () => string | null;
    setValue: (value: string | null | undefined) => void;
};

const SearchSelectItem: React.FC<SearchSelectItemProps> = ({ highlight, size, title, isSelected, onClick }) => {
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <div className={cn(searchselectItem({size}), { "bg-dark text-white" : isSelected })} onClick={onClick}>
            {isSelected && <Check size={12} strokeWidth={3} className={"mr-2"}/>}
            <span>
                {parts.map((part, index) => (
                    part.toLowerCase() === highlight?.toLowerCase() ? (
                        <span key={index} className="text-white">{part}</span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                ))}
            </span>
        </div>
    );
}


const SearchSelect = forwardRef<SearchSelectRef, SearchSelectProps>(({label, onValueChange, icon, size,  buttonTitle, preSelectedValue, children}, ref) => {
    const inputRef = useRef<InputRef>(null);
    const searchselectRef = useRef<SearchSelectRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(preSelectedValue || null);
    const [searchTerm, setSearchTerm] = useState<string>(preSelectedValue || "");
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

    const filteredChildren = React.Children.toArray(children).filter((child) => {
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
        <div className={"flex flex-col space-y-1"} ref={menuRef}>
            {label &&
                <span className={"ml-1 text-marcador text-xs"}>{label}</span>
            }

            <div className={"space-y-1"} ref={menuRef}>
                <div className={cn(searchselect({ size }))} onClick={() => setIsOpen(true)}>
                    {icon}
                    <Input placeholder={buttonTitle}
                           value={searchTerm}
                           border={"none"}
                           elementSize={size}
                           onChange={handleInputChange}
                           size={Math.max((searchTerm as string).length/100*90, buttonTitle.length/100*90)}
                           ref={inputRef}
                    />
                    <ChevronsUpDown className={"group-hover/combo:text-white text-gray"} size={12} />
                </div>
                {isOpen && filteredChildren.length > 0 &&
                    <div className={"fixed z-50 max-h-48 w-max bg-black rounded-lg border border-edge overflow-hidden"}>
                        {filteredChildren.length > (size === "medium" ? 4 : 6) ? (
                            <CustomScroll>
                                <div className={"max-h-48"}>
                                    <div className={"flex flex-col text-gray space-y-1 pr-1 py-1"}>
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
                                                    size: size
                                                });
                                            }
                                            return child;
                                        })}
                                    </div>
                                </div>
                            </CustomScroll>
                        ) : (
                            <div className={"flex flex-col text-gray space-y-1 py-1"}>
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