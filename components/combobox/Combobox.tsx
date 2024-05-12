"use client";

import React, {ReactNode, useState} from "react";
import { cn } from "../../utils/cn";
import {ChevronsUpDown} from "lucide-react";

interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    isSelected?: boolean;
}

interface ComboboxIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    buttonTitle: string;
}

const ComboboxIcon = React.forwardRef<HTMLDivElement, ComboboxIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("mr-2", className)} ref={ref} {...props}>
        {icon}
    </div>
));
ComboboxIcon.displayName = "ComboboxIcon";


const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(({ title, isSelected, className, ...props }, ref) => (
    <div className={cn("bg-black text-gray text-sm cursor-pointer rounded-lg hover:bg-selected hover:text-white p-2 flex items-center", className, isSelected ? "bg-white" : "bg-black")} ref={ref} {...props}>
        {props.children}
        <span className={cn("ml-1", className)}>{title}</span>
    </div>
));
ComboboxItem.displayName = "ComboboxItem";


const Combobox: React.FC<ComboboxProps> = ({buttonTitle, className, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(null);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        setSelectedValue(item);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <div className={cn("group/combo text-gray whitespace-nowrap rounded-lg font-normal text-sm py-2 px-4 flex items-center bg-black hover:text-white border border-white border-opacity-20 overflow-hidden",
                className)} {...props} onClick={handleButtonClick}>
                <span>{!selectedValue ? buttonTitle : selectedValue}</span>
                <ChevronsUpDown className={cn("group-hover/combo:text-white ml-2 text-gray", className)} size={12}/>
            </div>
            {isOpen && (
                <div className={cn("absolute top-full w-min flex flex-col rounded-lg py-2 px-2 bg-black text-gray whitespace-nowrap", className)}>
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
};

export { Combobox, ComboboxItem, ComboboxIcon };
