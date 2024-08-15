"use client";

import React, {useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {CloseButton} from "../closebutton/CloseButton";

const datepicker = cva("flex flex-row items-center space-x-2 rounded-lg cursor-pointer border border-zinc-300 dark:border-edge " +
    "bg-zinc-200 dark:bg-black-light hover:bg-zinc-300 dark:hover:bg-dark-light text-zinc-700 dark:text-gray hover:text-zinc-800 dark:hover:text-white", {
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

type DatepickerRef = HTMLDivElement & {
    reset: () => void;
    getSelectedValue: () => Date | null;
    setValue: (value: Date | null | undefined) => void;
};

const DatePicker = React.forwardRef<DatepickerRef, DatePickerProps>(({label, onValueChange, dayFormat, closeButton, onClose, preSelectedValue, text, size, className, ...props}, ref) => {
    const datepickerRef = useRef<DatepickerRef>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(preSelectedValue ?? undefined);
    const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">("left");

    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const spaceOnRight = window.innerWidth - rect.right;
            if (spaceOnRight < 300) {
                setDropdownPosition("right");
            } else {
                setDropdownPosition("left");
            }
        }
    }, [isOpen]);

    useOutsideClick((e) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    });

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
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-500 dark:text-marcador text-xs"}>{label}</span>
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
                        <CalendarDays size={size === "small" ? 12 : 16}/>
                        <span>{!selectedValue ? text : formatDate()}</span>
                        <ChevronsUpDown size={12}/>
                    </div>
                    {selectedValue && closeButton &&
                        <CloseButton
                            iconSize={16}
                            className={cn("w-min hover:bg-zinc-300 hover:dark:bg-dark-light h-min rounded-l-none border border-zinc-300 dark:border-edge",
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
                        <Calendar onDayClick={handleDayClick} selected={selectedValue}/>
                    </div>
                )}
            </div>
        </div>
    );
})
DatePicker.displayName = "DatePicker";


export {DatePicker, DatepickerRef};