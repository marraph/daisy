"use client";

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {addDays, format} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {CloseButton} from "../closebutton/CloseButton";
import {DateRange, DayPicker} from "react-day-picker";

const daterangepicker = cva("flex flex-row items-center bg-black rounded-lg border border-white border-opacity-20 text-gray cursor-pointer hover:text-white hover:bg-dark", {
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

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof daterangepicker> {
    text: string;
    iconSize: number;
    preSelectedRange?: DateRange | undefined;
    onClose?: () => void;
    onRangeChange?: (range: DateRange | undefined) => void;
    closeButton: boolean;
    dayFormat: "short" | "long";
}

type DateRangePickerRef = HTMLDivElement & {
    reset: () => void;
    getSelectedValue: () => DateRange | undefined;
    setValue: (range: DateRange) => void;
};

const DateRangePicker = forwardRef<DateRangePickerRef, DateRangePickerProps>(({onRangeChange, dayFormat, closeButton, onClose, preSelectedRange, text, iconSize, size, className, ...props}, ref) => {
    const daterangepickerRef = useRef<DateRangePickerRef>(null);
    const [isOpen, setIsOpen] = useState(false);

    const initialRange: DateRange = {
        from: new Date(),
        to: addDays(new Date(), 1)
    };

    const [range, setRange] = useState<DateRange | undefined>(preSelectedRange ? preSelectedRange : initialRange);

    const menuRef = useOutsideClick(() => {
        setIsOpen(false);
    });

    const formatDate = (date: Date | undefined) => {
        if (!date) return;

        if (dayFormat === "long") {
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = daysOfWeek[date.getDay()];
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${dayOfWeek}, ${month}-${day}-${year}`;
        }

        if (dayFormat === "short") return format(date, "MM-dd-yyyy");
    };

    useImperativeHandle(ref, () => ({
        reset: () => setRange(undefined),
        getSelectedValue: () => range,
        setValue: (range: DateRange | undefined) => setRange(range),
        ...daterangepickerRef.current,
    }));

    useEffect(() => {
        if (onRangeChange) {
            onRangeChange(range);
        }
    }, [range, onRangeChange]);

    return (
        <div className={cn("relative inline-block space-y-1", className)} ref={menuRef}>
            <div className={"flex flex-row items-center"}>
                <div className={cn(daterangepicker({size}),
                    `${range === undefined ? "px-2 rounded-lg" : "px-2 rounded-l-lg border-r-0"}`,
                    `${closeButton ? "rounded-r-none" : "rounded-r-lg border-r"}`,
                    `${closeButton && range === undefined && "rounded-r-lg"}`, className)}
                     onClick={() => setIsOpen(!isOpen)} {...props}>
                    <CalendarDays size={iconSize} className={"mr-1"}/>
                    <div className={"flex flex-row space-x-2"}>
                        {range === undefined &&
                            <span>{text}</span>
                        }
                        {range !== undefined &&
                            <>
                                <span>{range.from ? formatDate(range.from) : "Select start"}</span>
                                <span>{"-"}</span>
                                <span>{range.to ? formatDate(range.to) : "Select end"}</span>
                            </>
                        }
                    </div>
                <ChevronsUpDown size={12}/>
                </div>
                {range && closeButton &&
                    <CloseButton iconSize={size === "medium" ? 15 : 16}
                                 className={cn("w-min bg-black h-min rounded-l-none border border-white border-opacity-20",
                                 (size === "medium" ? "py-1" : ""), className)}
                                 onClick={(e) => {e.stopPropagation(); setRange(undefined); onClose();}}
                    />
                }
            </div>

            {isOpen && (
                <div className={cn("absolute top-full left-0 overflow-hidden", className)} ref={menuRef}>
                    <DayPicker mode={"range"}
                               selected={range}
                               onSelect={setRange}
                               showOutsideDays={true}
                               className={cn("p-3 text-white bg-black rounded-lg border border-white border-opacity-20", className)}
                               classNames={{
                                   months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                   month: "space-y-4",
                                   caption: "flex justify-center pt-1 relative items-center",
                                   caption_label: "text-sm font-medium",
                                   nav: "space-x-1 flex items-center",
                                   nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
                                   nav_button_previous: "absolute left-1",
                                   nav_button_next: "absolute right-1",
                                   table: "w-full border-collapse space-y-1",
                                   head_row: "flex",
                                   head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                   row: "flex w-full mt-2",
                                   cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                                   day: cn("h-9 w-9 p-0 font-normal cursor-pointer rounded-lg hover:bg-dark"),
                                   day_range_end: "day-range-end rounded-r-lg rounded-l-none",
                                   day_range_start: "rounded-l-lg rounded-r-none",
                                   day_selected: "bg-selectwhite text-dark hover:bg-selectwhite rounded-lg",
                                   day_today: "bg-dark text-white rounded-lg",
                                   day_outside: "day-outside opacity-50",
                                   day_disabled: "text-muted-foreground opacity-50",
                                   day_range_middle: "text-white rounded-none",
                                   day_hidden: "invisible",
                               }}
                    />
                </div>
            )}
        </div>
    );
})
DateRangePicker.displayName = "DateRangePicker";


export {DateRangePicker, DateRangePickerRef};