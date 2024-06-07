"use client";

import React, {useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays, Delete} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import { motion } from "framer-motion";

const datepicker = cva("flex flex-row items-center bg-black rounded-lg border border-white border-opacity-20 text-gray cursor-pointer", {
    variants: {
        size: {
            small: ["text-xs", "py-1", "px-2", "space-x-2"],
            medium: ["text-sm", "py-2", "px-3", "space-x-2"],
            large: ["text-base", "py-3", "px-4", "space-x-3"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof datepicker> {
    text: string;
    iconSize: number;
}

export type DatepickerRef = HTMLDivElement & {
    reset: () => void
    getSelectedValue: () => Date | null
};

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({text, iconSize, size, className, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(undefined);

    const datepickerRef = useRef<HTMLDivElement>(null);
    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseClick = () => {
        setSelectedValue(undefined);
    };

    const handleDayClick = (day: Date | undefined) => {
        setSelectedValue(day);
        setIsOpen(false);
    };


    useImperativeHandle(ref, () => ({
        reset: () => setSelectedValue(null),
        getSelectedValue: () => selectedValue,
        ...datepickerRef.current,
    }));

    return (
        <div className={cn("relative inline-block space-y-1", className)}>
            <div className={cn(datepicker({size}), className)} {...props}>
                <div onClick={handleButtonClick} className={"flex flex-row items-center space-x-1"}>
                    <CalendarDays size={iconSize} className={"mr-1"}/>
                    <span>{!selectedValue ? text : (format(selectedValue, "MM-dd-yyyy"))}</span>
                </div>
                {selectedValue &&
                    <Delete size={12} className={"hover:text-white"} onClick={handleCloseClick}/>
                }
            </div>
            {isOpen && (
                <motion.div className={cn("absolute top-full left-0 overflow-hidden", className)} ref={menuRef}
                            initial={{maxHeight: 0}}
                            animate={{maxHeight: isOpen ? '360px' : 0}}
                            transition={{duration: 0.3}}>
                    <Calendar onDayClick={handleDayClick}/>
                </motion.div>
            )}
        </div>
    );
})
DatePicker.displayName = "DatePicker";


export {DatePicker};