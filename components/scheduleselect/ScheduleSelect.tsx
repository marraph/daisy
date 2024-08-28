import React, {InputHTMLAttributes, ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {cn} from "@/utils/cn";
import {useDropdownPosition} from "@/hooks/useDropdownPosition";
import {useOutsideClick} from "@/hooks/useOutsideClick";
import * as chrono from 'chrono-node';
import {ParsedResult} from 'chrono-node';
import {format} from "date-fns";
import {DateRange} from "react-day-picker";
import {useHotkeys} from "react-hotkeys-hook";

interface ScheduleSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    label?: string;
    onValueChange?: (value: Date | DateRange) => void;
    preSchedules?: string[];
}

const ScheduleSelect: React.FC<ScheduleSelectProps> = ({ icon, label, onValueChange, preSchedules, ...props }) => {
    const defaultSchedules = useMemo(() => {
        const array: ParsedResult[] = [];
        if (preSchedules) {
            preSchedules.forEach((schedule) => {
                array.push(chrono.parse(schedule)[0]);
            });
        }
        else {
            array.push(chrono.parse("Tomorrow morning")[0]);
            array.push(chrono.parse("Tomorrow afternoon")[0]);
            array.push(chrono.parse("Next week")[0]);
        }
        return array;
    }, [preSchedules]);

    const [open, setOpen] = useState<boolean>(false);
    const [scheduleResults, setScheduleResults] = useState<ParsedResult[]>(defaultSchedules);
    const [inputValue, setInputValue] = useState<string>("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const menuRef = useOutsideClick(() => handleClose());
    const inputRef = useRef(null);
    const dropdownPosition = useDropdownPosition(menuRef);

    useHotkeys("up", () => open && setHighlightedIndex((prev) => (prev === 0 ? scheduleResults.length - 1 : prev - 1)), [open, scheduleResults]);

    useHotkeys("down", () => open && setHighlightedIndex((prev) => (prev === scheduleResults.length - 1 ? 0 : prev + 1)), [open, scheduleResults]);

    useHotkeys("enter", () => {
        if (highlightedIndex !== -1 && open) {
            const item = scheduleResults[highlightedIndex];
            handleSelect(item);
        }
    }, [highlightedIndex]);

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.style.width = input.value.length + 'ch';
        }
    }, []);

    const handleSelect = (value: ParsedResult) => {
        setInputValue(formatScheduleDay(value))
        setOpen(false);

        if (onValueChange) {
            if (value.start?.date() && !value.end?.date()) {
                onValueChange?.(value.start.date());
            }
            if (value.start?.date() && value.end?.date()) {
                onValueChange?.({to: value.start.date(), from: value.end.date()});
            }
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const results = chrono.parse(e.target.value);
        setScheduleResults(results);

        if (e.target.value.trim() === "") {
            setScheduleResults(defaultSchedules);
        }

        const input = e.target;
        input.style.width = input.value.length + 'ch';
    }

    const handleClose = () => {
        setOpen(false);
        setHighlightedIndex(-1);
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
                    <input className={"min-w-40 max-w-full text-sm rounded-lg font-normal focus-visible:outline-none focus-visible:ring-0 text-zinc-700 dark:text-gray " +
                                "focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador bg-transparent py-1.5 px-3"}
                           type={"text"}
                           spellCheck={false}
                           onChange={handleOnChange}
                           onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    inputRef.current?.blur();
                                    setHighlightedIndex((prev) => (prev === scheduleResults.length - 1 ? 0 : prev + 1));
                                }
                                if (e.key === "Escape") {
                                    e.preventDefault();
                                    inputRef.current?.blur();
                                    handleClose();
                                }
                           }}
                           value={inputValue}
                           onClick={() => setOpen(true)}
                           ref={inputRef}
                           {...props}

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
                                 className={cn("mx-1 p-2 flex flex-row space-x-12 justify-between items-center cursor-pointer rounded-lg " +
                                     "bg-zinc-100 dark:bg-black-light hover:bg-zinc-200 dark:hover:bg-dark-light",
                                     highlightedIndex === index && "bg-zinc-200 dark:bg-dark-light")}
                                 onClick={() => handleSelect(schedule)}
                            >
                                <span className={"text-sm text-zinc-800 dark:text-white"}>{schedule.text}</span>
                                <span className={"text-xs text-zinc-400 dark:text-marcador"}>{formatScheduleDay(schedule)}</span>
                            </div>
                        ))}

                        {scheduleResults.length > 0 &&
                            <div className={"w-full text-right mt-1 px-2 border-t border-zinc-300 dark:border-edge rounded-b-lg"}>
                                <span className={"text-[0.6rem] text-zinc-400 dark:text-marcador"}>
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

export {ScheduleSelect};