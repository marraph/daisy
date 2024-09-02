"use client";

import React, {useMemo, useState} from "react";
import {cn} from "@/utils/cn";
import {DateRange, DayPicker, DayPickerRangeProps, DayPickerSingleProps} from "react-day-picker";
import {addMonths, isToday, isWithinInterval, startOfDay} from "date-fns";

type CalendarSingleProps = Omit<DayPickerSingleProps, 'mode'> & {
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
};

type CalendarRangeProps = Omit<DayPickerRangeProps, 'mode'> & {
    numberOfMonths?: number;
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
};

const menuClassNames = "p-3 text-zinc-700 dark:text-white bg-zinc-100 dark:bg-black-light rounded-lg border border-zinc-300 dark:border-edge";

const commonClassNames = {
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "h-9 w-9 hover:bg-zinc-200 dark:hover:bg-dark rounded-lg text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
    day: "h-9 w-9 p-0 font-normal cursor-pointer rounded-lg",
    day_outside: "day-outside opacity-50",
    day_range_end: "day-range-end rounded-r-lg rounded-l-none",
    day_range_start: "day-range-start rounded-l-lg rounded-r-none",
    day_range_middle: "rounded-none"
};

const CalendarSingle: React.FC<CalendarSingleProps> = ({ selected, onSelect, ...props }) => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const [month, setMonth] = useState(nextMonth);

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            month={month}
            onMonthChange={setMonth}
            showOutsideDays={true}
            className={menuClassNames}
            classNames={{
                ...commonClassNames,
                day_today:
                    cn("rounded-lg",
                    selected && isToday(selected)
                        ? "bg-black-light dark:bg-white"
                        : "bg-zinc-200 dark:bg-dark"
                    ),
                day_selected: "bg-black-light text-white dark:text-black",
            }}
            {...props}
        />
    );
};

const CalendarRange: React.FC<CalendarRangeProps> = ({ numberOfMonths, selected, onSelect, ...props }) => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const [month, setMonth] = useState(nextMonth);

    const isTodaySelected = useMemo(() => {
        if (selected?.from && selected?.to) {
            const today = startOfDay(new Date());
            return isWithinInterval(today, { start: selected.from, end: selected.to });
        }
        return false;
    }, [selected]);

    return (
        <DayPicker
            mode="range"
            selected={selected}
            onSelect={onSelect}
            month={month}
            numberOfMonths={numberOfMonths}
            onMonthChange={setMonth}
            showOutsideDays={true}
            className={menuClassNames}
            classNames={{
                ...commonClassNames,
                day_today:
                    cn("rounded-lg",
                    isTodaySelected
                        ? "bg-black-light text-white dark:bg-white dark:text-black"
                        : "bg-zinc-300 dark:bg-dark"
                ),
                day_selected: "bg-black-light dark:bg-white text-white dark:text-black",
            }}
            {...props}
        />
    );
};

export { CalendarSingle, CalendarRange };