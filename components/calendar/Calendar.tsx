"use client";

import React, {useState} from "react";
import { cn } from "../../utils/cn";
import {DayPicker} from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar: React.FC<CalendarProps> = ({ className, classNames, ...props }) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);


    return (
        <DayPicker {...props}
            mode={"single"}
            selected={selectedDay}
            onSelect={setSelectedDay}
            showOutsideDays={true}
            className={"p-3 text-white bg-black rounded-lg border border-edge"}
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
                day: "h-9 w-9 p-0 font-normal cursor-pointer rounded-lg hover:bg-dark",
                day_today: "bg-dark text-white rounded-lg",
                day_outside: "day-outside opacity-50",
                day_selected: "bg-white text-black",
                day_disabled: "text-muted-foreground opacity-50",
                day_hidden: "invisible",
                ...classNames,
            }}
        />
    )
};
Calendar.displayName = "Calendar";

export { Calendar };