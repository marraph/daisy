"use client";

import React, {useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {CloseButton} from "../closebutton/CloseButton";

const datepicker = cva("flex flex-row items-center bg-black rounded-lg border border-edge text-gray cursor-pointer hover:text-white hover:bg-dark space-x-2", {
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

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof datepicker> {
    text: string;
    preSelectedValue?: Date | null | undefined;
    onClose?: () => void;
    onValueChange?: (value: Date | null) => void;
    closeButton: boolean;
    dayFormat: "long" | "short";
}

type DatepickerRef = HTMLDivElement & {
    reset: () => void;
    getSelectedValue: () => Date | null;
    setValue: (value: Date | null | undefined) => void;
};

const DatePicker = React.forwardRef<DatepickerRef, DatePickerProps>(({onValueChange, dayFormat, closeButton, onClose, preSelectedValue, text, size, className, ...props}, ref) => {
    const datepickerRef = useRef<DatepickerRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(preSelectedValue ? preSelectedValue : undefined);

    const formatDate = () => {
        if (!selectedValue) return;

        if (dayFormat === "long") {
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = daysOfWeek[selectedValue.getDay()];
            const month = (selectedValue.getMonth() + 1).toString().padStart(2, '0');
            const day = selectedValue.getDate().toString().padStart(2, '0');
            const year = selectedValue.getFullYear();
            return `${dayOfWeek}, ${month}-${day}-${year}`;
        }

        if (dayFormat === "short") return format(selectedValue, "MM-dd-yyyy");
    }

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const handleDayClick = (day: Date | undefined) => {
        const newValue = (selectedValue === day) ? null : day;
        setSelectedValue(newValue);
        setIsOpen(false);
        onValueChange && onValueChange(newValue)
    };


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
                    <CalendarDays size={size === "small" ? 12 : 16} className={"mr-1"}/>
                    <span>{!selectedValue ? text : formatDate()}</span>
                    <ChevronsUpDown size={12}/>
                </div>
                {selectedValue && closeButton &&
                    <CloseButton iconSize={16}
                        className={cn("w-min bg-black h-min rounded-l-none border border-edge",
                            (size === "medium" ? "py-1" : ""), className)}
                        onClick={(e) => {e.stopPropagation(); handleDayClick(undefined); onClose();}}
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