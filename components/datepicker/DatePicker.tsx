import React, {ReactNode, useState} from "react";
import { cn } from "../../utils/cn";
import {Button, ButtonIcon} from "../button/Button";
import {Calendar} from "../calendar/Calendar";
import {format} from "date-fns";

export interface DatePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    icon: ReactNode;
}

const DatePicker: React.FC<DatePickerProps> = ({ text, icon, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(undefined);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDayClick = (day: Date | undefined) => {
        setSelectedValue(day);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative inline-block", className)}>
            <Button text={!selectedValue ? text : (format(selectedValue, "MM-dd-yyyy"))} onClick={handleButtonClick}>
                <ButtonIcon icon={icon} />
            </Button>
            {isOpen && (
                <div className={cn("absolute top-full left-0", className)}>
                    <Calendar onDayClick={handleDayClick}/>
                </div>
            )}
        </div>
    );
}


export {DatePicker};