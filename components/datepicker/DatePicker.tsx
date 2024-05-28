"use client";

import React, {useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays} from "lucide-react";
import {CloseButton} from "../closebutton/CloseButton";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    iconSize: number;
}

export type DatepickerRef = HTMLDivElement & { reset: () => void };

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({text, iconSize, className, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(undefined);

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

    const datepickerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setSelectedValue(null),
        ...datepickerRef.current,
    }));

    return (
        <div className={cn("relative inline-block", className)}>
            <div className={"flex flex-row space-x-1 items-center bg-black rounded-lg border border-white border-opacity-20 text-gray text-xs pl-2 py-0.5 pr-0.5 cursor-pointer"} {...props}>
                <div onClick={handleButtonClick} className={"flex flex-row items-center space-x-1"}>
                    <CalendarDays size={iconSize} className={"mr-1"}/>
                    <span>{!selectedValue ? text : (format(selectedValue, "MM-dd-yyyy"))}</span>
                </div>
                <CloseButton iconSize={12} onClick={handleCloseClick}/>
            </div>
            {isOpen && (
                <div className={cn("absolute top-full left-0", className)}>
                    <Calendar onDayClick={handleDayClick}/>
                </div>
            )}
        </div>
    );
})
DatePicker.displayName = "DatePicker";


export {DatePicker};