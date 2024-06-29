"use client";

import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
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
    onClose?: () => void;
    closeButton: boolean;
}

type DatepickerRef = HTMLDivElement & {
    reset: () => void;
    getSelectedValue: () => Date | null;
    setValue: (value: Date | null | undefined) => void;
};

const DatePicker = React.forwardRef<DatepickerRef, DatePickerProps>(({closeButton, onClose, preSelectedValue, text, iconSize, size, className, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(preSelectedValue ? preSelectedValue : undefined);

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleDayClick = (day: Date | undefined) => {
        setSelectedValue(day);
        setIsOpen(false);
    };

    const datepickerRef = useRef<DatepickerRef>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setSelectedValue(null),
        getSelectedValue: () => selectedValue,
        setValue: (value: Date) => setSelectedValue(value),
        ...datepickerRef.current,
    }));

    return (
        <div className={cn("relative inline-block space-y-1", className)} ref={menuRef}>
            <div className={"flex flex-row items-center"}>
                <div className={cn(datepicker({size}),
                    `${!selectedValue ? "px-2 rounded-lg" : "px-2 rounded-l-lg border-r-0"}`,
                    `${closeButton ? "rounded-r-none" : "rounded-r-lg border-r"}`,
                    `${closeButton && !selectedValue && "rounded-r-lg"}`, className)}
                     onClick={() => setIsOpen(!isOpen)} {...props}>
                    <CalendarDays size={iconSize} className={"mr-1"}/>
                    <span>{!selectedValue ? text : (format(selectedValue, "MM-dd-yyyy"))}</span>
                    <ChevronsUpDown size={12}/>
                </div>
                {selectedValue && closeButton &&
                    <CloseButton iconSize={size === "medium" ? 15 : 16}
                        className={cn("w-min bg-black h-min rounded-l-none border border-white border-opacity-20",
                            (size === "medium" ? "py-1" : ""), className)}
                        onClick={(e) => {e.stopPropagation(); setSelectedValue(undefined); onClose();}}
                    />
                }
            </div>

            {isOpen && (
                <div className={cn("absolute top-full left-0 overflow-hidden", className)} ref={menuRef}>
                    <Calendar onDayClick={handleDayClick} />
                </div>
            )}
        </div>
    );
})
DatePicker.displayName = "DatePicker";


export {DatePicker, DatepickerRef};