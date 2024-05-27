"use client"

import React, {useState} from "react";
import { cn } from "../../utils/cn";

interface SwitchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    firstTitle: string;
    secondTitle: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ firstTitle, secondTitle, className, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(true);

    return (
        <div className={cn("flex items-center rounded-lg font-normal cursor-pointer text-gray bg-dark border border-white border-opacity-20 text-sm", className)}
             {...props}>
            <div className={"flex flex-row w-max h-full items-center px-0.5"} onClick={() => {setSelectedValue(!selectedValue); console.log("click");}}>
                <div className={selectedValue ? "bg-black text-white mr-1 rounded-lg px-2 py-0.5" : "bg-dark text-gray mr-1 rounded-lg px-2 py-0.5 hover:text-white"}>
                    {firstTitle}
                </div>
                <div className={selectedValue ? "bg-dark text-gray rounded-lg px-2 py-0.5 hover:text-white" : "bg-black text-white rounded-lg px-2 py-0.5"}>
                    {secondTitle}
                </div>
            </div>
        </div>
    );
};

