"use client";

import React, {useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import { motion } from "framer-motion";
import {CloseButton} from "../closebutton/CloseButton";

const datepicker = cva("flex flex-row items-center bg-black rounded-lg border border-white border-opacity-20 text-gray cursor-pointer hover:text-white hover:bg-dark", {
    variants: {
        size: {
            small: ["text-xs", "py-1", "px-2", "space-x-2"],
            medium: ["text-sm", "py-1.5", "px-3", "space-x-2", "h-8"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof datepicker> {
    text: string;
    iconSize: number;
    preSelectedValue?: Date | null | undefined;
}

export type DatepickerRef = HTMLDivElement & {
    reset: () => void;
    getSelectedValue: () => Date | null;
    setValue: (value: Date | null | undefined) => void;
};

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({preSelectedValue, text, iconSize, size, className, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(preSelectedValue ? preSelectedValue : undefined);

    const datepickerRef = useRef<HTMLDivElement>(null);

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleDayClick = (day: Date | undefined) => {
        setSelectedValue(day);
        setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
        reset: () => setSelectedValue(null),
        getSelectedValue: () => selectedValue,
        setValue: (value: Date) => setSelectedValue(value),
        ...datepickerRef.current,
    }));

    return (
        <div className={cn("relative inline-block space-y-1", className)}>
            <div className={"flex flex-row items-center"}>
                <div className={cn(datepicker({size}),
                    `${!selectedValue ?
                        "px-2 rounded-lg" :
                        "px-2 rounded-l-lg rounded-r-none border-r-0"}`, className)}
                     onClick={() => setIsOpen(!isOpen)} {...props}>
                    <CalendarDays size={iconSize} className={"mr-1"}/>
                    <span>{!selectedValue ? text : (format(selectedValue, "MM-dd-yyyy"))}</span>
                    <ChevronsUpDown size={12}/>
                </div>
                {selectedValue &&
                    <div
                        className={"h-8 group/delete flex flex-row rounded-r-lg bg-black items-center border border-white border-opacity-20 hover:bg-dark hover:text-white"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedValue(undefined);
                        }}>
                        {size === "small" &&
                            <CloseButton iconSize={16} className={"group-hover/delete:bg-dark group-hover/close:text-white bg-black w-full h-full rounded-l-none"}/>
                        }
                        {size === "medium" &&
                            <CloseButton iconSize={16} className={"group-hover/delete:bg-dark group-hover/close:text-white bg-black w-full rounded-l-none"}/>
                        }
                    </div>
                }
            </div>

            {isOpen && (
                <div className={cn("absolute top-full left-0 overflow-hidden", className)} ref={menuRef}>
                    <Calendar onDayClick={handleDayClick}/>
                </div>
            )}
        </div>
    );
})
DatePicker.displayName = "DatePicker";


export {DatePicker};