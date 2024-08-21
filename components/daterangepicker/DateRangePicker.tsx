"use client";

import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {addDays} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {CloseButton} from "../closebutton/CloseButton";
import {DateRange} from "react-day-picker";
import moment from "moment/moment";
import {CalendarRange} from "../calendar/Calendar";
import {useOutsideClick} from "@/hooks/useOutsideCliick";
import {useDropdownPosition} from "@/hooks/useDropdownPosition";
import {useHotkeys} from "react-hotkeys-hook";

const daterangepicker = cva("flex flex-row items-center space-x-2 rounded-lg cursor-pointer border border-zinc-300 dark:border-edge " +
    "bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray", {
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

const DateRangePicker: React.FC<DateRangePickerProps> = ({label, onRangeChange, dayFormat, closeButton, onClose, preSelectedRange, text, size, className, ...props}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [range, setRange] = useState<DateRange>(preSelectedRange || {from: undefined, to: undefined});
    const [month, setMonth] = useState(new Date());
    const dropdownPosition = useDropdownPosition(menuRef);

    useOutsideClick((e) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpen(false);
            !range.from && !range.to && setMonth(new Date());
        }
    });

    useHotkeys("esc", () => {
        setIsOpen(false);
        !range.from && !range.to && setMonth(new Date());
        onClose?.();
    });
    useHotkeys("right", () => {
        setMonth(moment(month).add(1, "month").toDate());
    });
    useHotkeys("left", () => {
        setMonth(moment(month).subtract(1, "month").toDate());
    });
    
    const formatDate = useCallback((date: Date | undefined) => {
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
    }, [dayFormat]);

    return (
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-400 dark:text-marcador text-xs"}>{label}</span>
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
                            {range.from === undefined && range.to === undefined ?
                                <span>{text}</span>
                            :
                                <>
                                    <span>{range.from ? formatDate(range.from) : ""}</span>
                                    <span>{" - "}</span>
                                    <span>{range.to ? formatDate(range.to) : ""}</span>
                                </>
                            }
                        </div>
                    <ChevronsUpDown size={12}/>
                    </div>
                    {range && closeButton &&
                        <CloseButton iconSize={16}
                                     className={cn("w-min h-min hover:bg-zinc-200 hover:dark:bg-dark-light rounded-l-none border border-zinc-300 dark:border-edge",
                                     (size === "medium" ? "py-1" : ""), className)}
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         setIsOpen(false);
                                         setRange({from: undefined, to: undefined});
                                         setMonth(new Date());
                                         onClose?.();
                                     }}
                        />
                    }
                </div>

                {isOpen && (
                    <div className={cn("absolute top-full overflow-hidden",
                         dropdownPosition === "left" ? "left-0" : "right-0")}
                         ref={menuRef}
                    >
                        <CalendarRange
                            selected={range}
                            onSelect={(range: DateRange) => {
                                setRange(range);
                                onRangeChange?.(range);
                            }}
                            month={month}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export {DateRangePicker};