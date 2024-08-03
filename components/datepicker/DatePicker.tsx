"use client";

import React, {ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";
import {CalendarDays, ChevronsUpDown} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../utils/clickOutside";
import {CloseButton} from "../closebutton/CloseButton";
import ReactDOM from "react-dom";

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

interface DatePickerPortalProps {
    children: ReactNode;
}

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

const DatePickerPortal: React.FC<DatePickerPortalProps> = ({children}) => {
    return ReactDOM.createPortal(
        children,
        document.body
    );
}

const DatePicker = React.forwardRef<DatepickerRef, DatePickerProps>(({label, onValueChange, dayFormat, closeButton, onClose, preSelectedValue, text, size, className, ...props}, ref) => {
    const datepickerRef = useRef<DatepickerRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(preSelectedValue ? preSelectedValue : undefined);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const itemRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.bottom + 4, left: rect.left });
        }
    }, [isOpen]);

    useOutsideClick((e) => {
        if ((menuRef.current && !menuRef.current.contains(e.target as Node)) &&
            (portalRef.current && !portalRef.current.contains(e.target as Node)))
        {
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
                <span className={"ml-1 text-marcador text-xs"}>{label}</span>
            }

            <div className={cn("flex flex-col space-y-1", className)}
                 ref={menuRef}
            >
                <div className={"flex flex-row items-center"}
                     onClick={() => setIsOpen(!isOpen)}
                     ref={itemRef}
                >
                    <div className={cn(datepicker({size}),
                        `${!selectedValue ? "px-2 rounded-lg" : "px-2 rounded-l-lg border-r-0"}`,
                        `${closeButton ? "rounded-r-none" : "rounded-r-lg border-r"}`,
                        `${closeButton && !selectedValue && "rounded-r-lg"}`, className)}
                         {...props}
                    >
                        <CalendarDays size={size === "small" ? 12 : 16}
                                      className={"mr-1"}
                        />
                        <span>{!selectedValue ? text : formatDate()}</span>
                        <ChevronsUpDown size={12}/>
                    </div>
                    {selectedValue && closeButton &&
                        <CloseButton
                            iconSize={16}
                            className={cn("w-min bg-black h-min rounded-l-none border border-edge", (size === "medium" ? "py-1" : ""), className)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDayClick(undefined);
                                onClose();
                            }}
                        />
                    }
                </div>

                {isOpen && (
                    <DatePickerPortal>
                        <div className={cn("absolute z-50", className)}
                             style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
                             ref={portalRef}
                        >
                            <Calendar onDayClick={handleDayClick} selected={selectedValue} />
                        </div>
                    </DatePickerPortal>
                )}
            </div>
        </div>
    );
})
DatePicker.displayName = "DatePicker";


export {DatePicker, DatepickerRef};