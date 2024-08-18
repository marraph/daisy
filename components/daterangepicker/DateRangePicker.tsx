"use client";

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {addDays} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {CloseButton} from "../closebutton/CloseButton";
import {DateRange, DayPicker} from "react-day-picker";
import moment from "moment/moment";

const daterangepicker = cva("flex flex-row items-center space-x-2 rounded-lg cursor-pointer border border-zinc-300 dark:border-edge " +
    "bg-zinc-200 dark:bg-black-light text-zinc-700 dark:text-gray", {
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

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof daterangepicker> {
    text: string;
    label?: string;
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

const DateRangePicker = forwardRef<DateRangePickerRef, DateRangePickerProps>(({label, onRangeChange, dayFormat, closeButton, onClose, preSelectedRange, text, size, className, ...props}, ref) => {
    const daterangepickerRef = useRef<DateRangePickerRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">("left");

    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const spaceOnRight = window.innerWidth - rect.right;
            if (spaceOnRight < 300) {
                setDropdownPosition('right');
            } else {
                setDropdownPosition('left');
            }
        }
    }, [isOpen]);

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

        const momentDate = moment(date);

        if (dayFormat === "long") {
            const dayOfWeek = momentDate.format('dddd');
            const month = momentDate.format('MM');
            const day = momentDate.format('DD');
            const year = momentDate.format('YYYY');
            return `${dayOfWeek}, ${month}-${day}-${year}`;
        }

        if (dayFormat === "short") {
            return momentDate.format('MM-DD-YYYY');
        }
    };

    useImperativeHandle(ref, () => ({
        reset: () => setRange(undefined),
        getSelectedValue: () => range,
        setValue: (range: DateRange | undefined) => setRange(range),
        ...daterangepickerRef.current,
    }));

    const handleDayClick = (day: Date | undefined) => {
        if (range === undefined) {
            setRange({from: day, to: addDays(day, 1)});
        } else {
            if (day === undefined) return;
            if (day < range.from) {
                setRange({from: day, to: range.to});
            } else {
                setRange({from: range.from, to: day});
            }
        }
        onRangeChange && onRangeChange(range);
    }

    return (
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-500 dark:text-marcador text-xs"}>{label}</span>
            }
            <div className={cn("relative inline-block space-y-1", className)} ref={menuRef}>
                <div className={"flex flex-row items-center"}>
                    <div className={cn(daterangepicker({size}),
                        `${range === undefined ? "px-2 rounded-lg" : "px-2 rounded-l-lg border-r-0"}`,
                        `${closeButton ? "rounded-r-none" : "rounded-r-lg border-r"}`,
                        `${closeButton && range === undefined && "rounded-r-lg"}`, className)}
                         onClick={() => setIsOpen(!isOpen)}
                         {...props}
                    >
                        <CalendarDays size={size === "small" ? 12 : 16} className={"mr-1"}/>
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
                        <CloseButton iconSize={16}
                                     className={cn("w-min h-min hover:bg-zinc-300 hover:dark:bg-dark-light rounded-l-none border border-zinc-300 dark:border-edge",
                                     (size === "medium" ? "py-1" : ""), className)}
                                     onClick={(e) => {e.stopPropagation(); setRange(undefined); onClose();}}
                        />
                    }
                </div>

                {isOpen && (
                    <div className={cn("absolute top-full overflow-hidden",
                         dropdownPosition === "left" ? "left-0" : "right-0")}
                         ref={menuRef}
                    >
                        <DayPicker mode={"range"}
                                   selected={range}
                                   onSelect={setRange}
                                   onDayClick={handleDayClick}
                                   showOutsideDays={true}
                                   className={"p-3 text-zinc-700 dark:text-white bg-zinc-200 dark:bg-black-light rounded-lg border border-zinc-300 dark:border-edge"}
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
                                       day: cn("h-9 w-9 p-0 font-normal cursor-pointer rounded-lg hover:bg-zinc-300 dark:hover:bg-dark"),
                                       day_range_end: "day-range-end rounded-r-lg rounded-l-none",
                                       day_range_start: "rounded-l-lg rounded-r-none",
                                       day_selected: "bg-zinc-300 dark:bg-dark-light text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-dark-light rounded-lg",
                                       day_today: "bg-zinc-300 dark:bg-dark text-zinc-800 dark:text-white rounded-lg",
                                       day_outside: "day-outside opacity-50",
                                       day_disabled: "text-muted-foreground opacity-50",
                                       day_range_middle: "text-zinc-800 dark:text-white rounded-none",
                                       day_hidden: "invisible",
                                   }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
})
DateRangePicker.displayName = "DateRangePicker";


export {DateRangePicker, DateRangePickerRef};