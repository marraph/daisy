"use client";

import React, {ReactNode, useState} from "react";
import { cn } from "../../utils/cn";
import {Button} from "../button/Button";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays} from "lucide-react";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    iconSize: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ text, iconSize, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(undefined);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDayClick = (day: Date | undefined) => {
        setSelectedValue(day);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative inline-block", className)} {...props}>
            <Button text={!selectedValue ? text : (format(selectedValue, "MM-dd-yyyy"))} onClick={handleButtonClick}>
                <CalendarDays size={iconSize} className={"mr-1"}/>
            </Button>
            {isOpen && (
                <div className={cn("absolute top-full left-0", className)}>
                    <Calendar onDayClick={handleDayClick}/>
                </div>
            )}
        </div>
    );
}


export {DatePicker};