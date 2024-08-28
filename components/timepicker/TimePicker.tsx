import React, {useEffect, useRef, useState} from "react";
import {ChevronsUpDown} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

interface TimerPickerProps {
    label?: string;
    withMeridiem?: boolean;
    onValueChange?: (value: string) => void;
}

const TimePicker: React.FC<TimerPickerProps> = ({ label, withMeridiem = false, onValueChange }) => {
    const [hours, setHours] = useState<string>("08");
    const [minutes, setMinutes] = useState<string>("00");
    const [meridiem, setMeridiem] = useState<string>("AM");
    const hoursRef = useRef<HTMLInputElement>(null);
    const minutesRef = useRef<HTMLInputElement>(null);

    const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        let newValue = value;

        if (value.length === 2) {
            const intValue = parseInt(value);
            if (withMeridiem) {
                if (intValue === 0) {
                    newValue = "12";
                } else if (intValue > 12) {
                    newValue = "12";
                }
            } else {
                if (intValue === 0) {
                    newValue = "12";
                } else if (intValue > 23) {
                    newValue = "23";
                }
            }

        }

        setHours(newValue);
        parseValue();

        if (newValue.length === 2 && minutesRef.current) {
            minutesRef.current.focus();
        }
    }

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        let newValue = value;

        if (value.length === 2) {
            const intValue = parseInt(value);
            if (intValue > 59) {
                newValue = "59";
            }
            minutesRef.current.blur();
        }

        setMinutes(newValue);
        parseValue();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, field: 'hours' | 'minutes') => {
        if (event.key === 'Backspace') {
            if (field === 'hours') {
                setHours('');
            } else {
                setMinutes('');
            }
        }

        if (event.key === 'ArrowUp') {
            if (field === 'hours') {
                const newValue = parseInt(hours) + 1;
                if (withMeridiem) {
                    if (newValue > 12) {
                        setHours('01');
                    } else {
                        setHours(newValue.toString().padStart(2, '0'));
                    }
                } else {
                    if (newValue > 23) {
                        setHours('00');
                    } else {
                        setHours(newValue.toString().padStart(2, '0'));
                    }
                }

            } else {
                const newValue = parseInt(minutes) + 1;
                if (newValue > 59) {
                    setMinutes('00');
                } else {
                    setMinutes(newValue.toString().padStart(2, '0'));
                }
            }
        }

        if (event.key === 'ArrowDown') {
            if (field === 'hours') {
                const newValue = parseInt(hours) - 1;
                if (withMeridiem) {
                    if (newValue === 0) {
                        setHours('12');
                    } else if (newValue < 0) {
                        setHours('12');
                    } else {
                        setHours(newValue.toString().padStart(2, '0'));
                    }
                } else {
                    if (newValue === 0) {
                        setHours('23');
                    } else if (newValue < 0) {
                        setHours('23');
                    } else {
                        setHours(newValue.toString().padStart(2, '0'));
                    }
                }
            } else {
                const newValue = parseInt(minutes) - 1;
                if (newValue === 0) {
                    setMinutes('59');
                } else if (newValue < 0) {
                    setMinutes('59');
                } else {
                    setMinutes(newValue.toString().padStart(2, '0'));
                }
            }
        }
    }

    useEffect(() => {
        if (hours === '') {
            hoursRef.current?.focus();
        }
    }, [hours]);

    useEffect(() => {
        if (minutes === '') {
            minutesRef.current?.focus();
        }
    }, [minutes]);

    const parseValue = () => {
        if (onValueChange) {
            let formattedHours = hours;
            if (withMeridiem) {
                if (meridiem === "PM" && hours !== "12") {
                    formattedHours = (parseInt(hours) + 12).toString().padStart(2, '0');
                } else if (meridiem === "AM" && hours === "12") {
                    formattedHours = "00";
                }
            }
            onValueChange(`${formattedHours}:${minutes}`);
        }
    }

    return (
        <div className={"flex flex-col space-y-1"}>

            {label && (
                <span className="ml-1 text-zinc-400 dark:text-marcador text-xs">
                    {label}
                </span>
            )}

            <div className={"flex flex-row space-x-2 items-center h-max"}>

                <input className={"text-center py-1 rounded-lg font-normal focus-visible:outline-none focus-visible:ring-0 text-zinc-700 dark:text-gray " +
                        "focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador bg-zinc-100 dark:bg-black-light " +
                        "border border-zinc-300 dark:border-edge"}
                       size={1}
                       value={hours}
                       onChange={handleHoursChange}
                       onKeyDown={(e) => handleKeyDown(e, 'hours')}
                       maxLength={2}
                />

                <span className={"text-zinc-800 dark:text-white text-lg font-semibold"}>:</span>

                <input className={"text-center py-1 rounded-lg font-normal focus-visible:outline-none focus-visible:ring-0 text-zinc-700 dark:text-gray " +
                        "focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador bg-zinc-100 dark:bg-black-light " +
                        "border border-zinc-300 dark:border-edge"}
                       size={1}
                       value={minutes}
                       onChange={handleMinutesChange}
                       onKeyDown={(e) => handleKeyDown(e, 'minutes')}
                       maxLength={2}
                       ref={minutesRef}
                />

                {withMeridiem &&
                    <div
                        className={"w-14 flex flex-row justify-between items-center rounded-lg border border-zinc-300 dark:border-edge bg-zinc-100 dark:bg-black-light px-2 py-1.5 cursor-pointer " +
                            "text-zinc-800 dark:text-white text-sm"}
                        onClick={() => {
                            setMeridiem(meridiem === "AM" ? "PM" : "AM")
                            parseValue();
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={meridiem}
                                initial={{y: 10, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: -10, opacity: 0}}
                                transition={{duration: 0.2}}
                            >
                                {meridiem}
                            </motion.span>
                        </AnimatePresence>
                        <ChevronsUpDown size={14} className={"text-zinc-500 dark:text-gray"}/>
                    </div>
                }
            </div>
        </div>
    );
}

export {TimePicker };