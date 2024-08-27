import React, {InputHTMLAttributes, ReactNode, useEffect, useMemo, useState} from "react";
import {cn} from "@/utils/cn";
import {useDropdownPosition} from "@/hooks/useDropdownPosition";
import {useOutsideClick} from "@/hooks/useOutsideClick";
import * as chrono from 'chrono-node';
import {ParsedResult} from 'chrono-node';
import {format} from "date-fns";

interface InputSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    label?: string;
    placeholder?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({ icon, label, placeholder }) => {
    const defaultSchedules = useMemo(() => {
        const array: ParsedResult[] = [];
        array.push(chrono.parse("Tomorrow")[0]);
        array.push(chrono.parse("Tomorrow morning")[0]);
        array.push(chrono.parse("Tomorrow afternoon")[0]);
        console.log(array[0].start.date());
        return array;
    }, []);

    const [open, setOpen] = useState<boolean>(false);
    const [scheduleResults, setScheduleResults] = useState<ParsedResult[]>(defaultSchedules);
    const [inputValue, setInputValue] = useState<string>("");
    const menuRef = useOutsideClick(() => handleClose());
    const dropdownPosition = useDropdownPosition(menuRef);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const results = chrono.parse(e.target.value);
        setScheduleResults(results);

        if (e.target.value.trim() === "") {
            setScheduleResults(defaultSchedules);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formatScheduleDay = (value: ParsedResult): string => {
        const start = value.start.date();
        const formattedStart = format(start, 'MMM d, yyyy h:mma');

        if (value.end) {
            const end = scheduleResults[0].end.date();
            const formattedEnd = format(end, 'h:mma');
            return `${formattedStart} - ${formattedEnd}`;
        }

        return formattedStart;
    }

    return (
        <div className={"flex flex-col space-y-1"}>

            {label && (
                <span className="ml-1 text-zinc-400 dark:text-marcador text-xs">
                    {label}
                </span>
            )}

            <div className={"relative space-y-1"}
                 ref={menuRef}
            >
                <div className={"flex flex-row space-x-2 rounded-lg bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray " +
                    "border border-zinc-300 dark:border-edge focus-within:border-zinc-500 dark:focus-within:border-white-dark"}
                >
                    {icon && (
                        <div className={cn("flex items-center justify-center p-2 pr-0")}>
                            {icon}
                        </div>
                    )}
                    <input className={"w-full text-sm rounded-lg font-normal focus-visible:outline-none focus-visible:ring-0 text-zinc-700 dark:text-gray " +
                                "focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador bg-transparent py-1.5 px-3"}
                           type={"text"}
                           spellCheck={false}
                           onChange={handleOnChange}
                           value={inputValue}
                           onClick={() => setOpen(true)}
                           placeholder={placeholder}
                    />
                </div>

                {open &&
                    <div className={cn("absolute z-50 max-h-48 w-max py-1 bg-zinc-100 dark:bg-black-light rounded-lg border border-zinc-300 dark:border-edge shadow-2xl",
                        dropdownPosition === "left" ? "left-0" : "right-0")}
                    >
                        {scheduleResults.length === 0 &&
                            <div className={"mx-1 p-2 flex flex-row space-x-12 justify-between items-center cursor-pointer rounded-lg bg-zinc-100 dark:bg-black-light"}
                            >
                                <span className={"text-sm text-zinc-800 dark:text-white"}>No results found</span>
                            </div>
                        }

                        {scheduleResults.map((schedule, index) => (
                            <div key={index}
                                 className={"mx-1 p-2 flex flex-row space-x-12 justify-between items-center cursor-pointer rounded-lg " +
                                     "bg-zinc-100 dark:bg-black-light hover:bg-zinc-200 dark:hover:bg-dark-light"}
                                 onClick={() => {
                                     setInputValue(formatScheduleDay(schedule))
                                     setOpen(false);
                                 }}
                            >
                                <span className={"text-sm text-zinc-800 dark:text-white"}>{schedule.text}</span>
                                <span className={"text-xs text-zinc-400 dark:text-marcador"}>{formatScheduleDay(schedule)}</span>
                            </div>
                        ))}

                        {scheduleResults.length > 0 &&
                            <div className={"w-full text-right mt-1 px-2 border-t border-zinc-300 dark:border-edge rounded-b-lg"}>
                                <span className={"text-xs text-zinc-400 dark:text-marcador"}>
                                    {format(scheduleResults[0].start.date(), 'zzzz')}
                                </span>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export {InputSelect};