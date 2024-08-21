"use client";

import React, {useCallback, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {CalendarSingle} from "../calendar/Calendar";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {CloseButton} from "../closebutton/CloseButton";
import moment from "moment";
import {useOutsideClick} from "@/hooks/useOutsideCliick";
import {useDropdownPosition} from "@/hooks/useDropdownPosition";
import {useHotkeys} from "react-hotkeys-hook";

const datepicker = cva("flex flex-row items-center justify-between space-x-2 rounded-lg cursor-pointer border border-zinc-300 dark:border-edge " +
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


interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof datepicker> {
    text: string;
    label?: string;
    preSelectedValue?: Date | null | undefined;
    onClose?: () => void;
    onValueChange?: (value: Date | null) => void;
    closeButton: boolean;
    dayFormat: "long" | "short";
}

const DatePicker: React.FC<DatePickerProps> = ({label, onValueChange, dayFormat, closeButton, onClose, preSelectedValue, text, size, className, ...props}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(preSelectedValue ?? undefined);
    const [month, setMonth] = useState(new Date());
    const dropdownPosition = useDropdownPosition(menuRef);

    useOutsideClick((e) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpen(false);
            !selectedValue && setMonth(new Date());
        }
    });

    useHotkeys("esc", () => {
        setIsOpen(false);
        !selectedValue && setMonth(new Date());
        onClose?.();
    });
    useHotkeys("right", () => {
        setMonth(moment(month).add(1, "month").toDate());
    });
    useHotkeys("left", () => {
        setMonth(moment(month).subtract(1, "month").toDate());
    });

    const formatDate = useCallback(() => {
        if (!selectedValue) return;

        const momentDate = moment(selectedValue);

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
    }, [dayFormat, selectedValue]);

    const handleDayClick = useCallback((day: Date | undefined) => {
        const newValue = (selectedValue === day) ? null : day;
        setSelectedValue(newValue);
        setIsOpen(false);
        !selectedValue && setMonth(new Date());
        onValueChange?.(newValue);
    }, [onValueChange, selectedValue]);

    return (
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-400 dark:text-marcador text-xs"}>{label}</span>
            }

            <div className={cn("relative", className)}
                 ref={menuRef}
            >
                <div className={"flex flex-row items-center"}
                     onClick={() => setIsOpen(!isOpen)}
                     {...props}
                >
                    <div className={cn(datepicker({size}),
                        `${!selectedValue ? "px-2 rounded-lg" : "px-2 rounded-l-lg border-r-0"}`,
                        `${closeButton ? "rounded-r-none" : "rounded-r-lg border-r"}`,
                        `${closeButton && !selectedValue && "rounded-r-lg"}`, className)}
                         {...props}
                    >
                        <div className={"flex flex-row space-x-2 items-center"}>
                            <CalendarDays size={size === "small" ? 12 : 16}/>
                            <span>{!selectedValue ? text : formatDate()}</span>
                        </div>
                        <ChevronsUpDown size={12}/>
                    </div>
                    {selectedValue && closeButton &&
                        <CloseButton
                            iconSize={16}
                            className={cn("w-min hover:bg-zinc-200 hover:dark:bg-dark-light h-min rounded-l-none border border-zinc-300 dark:border-edge",
                                (size === "medium" ? "py-1" : ""), className)
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDayClick(undefined);
                                onClose();
                            }}
                        />
                    }
                </div>

                {isOpen && (
                    <div className={cn("absolute z-50 mt-1", dropdownPosition === "left" ? "left-0" : "right-0")}>
                        <CalendarSingle onSelect={setSelectedValue}
                                        selected={selectedValue}
                                        month={month}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export {DatePicker};