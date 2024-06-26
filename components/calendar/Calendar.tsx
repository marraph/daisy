"use client";

import React, {useState} from "react";
import { cn } from "../../utils/cn";
import {DayPicker} from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    onSelect?: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ onSelect, className, classNames, ...props }) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

    const handleOnSelect = (day: Date) => {
        setSelectedDay(day);
        if (onSelect) {
            onSelect(day);
        }
    };

    return (
        <DayPicker {...props}
            mode={"single"}
            selected={selectedDay}
            onSelect={handleOnSelect}
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
                head_cell:
                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer rounded-lg hover:bg-dark"),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-dark text-white rounded-lg hover:text-black hover:bg-white",
                day_outside:
                    "day-outside opacity-50 aria-selected:bg-accent/50 aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
        }} />
    )
};
Calendar.displayName = "Calendar";

export { Calendar };