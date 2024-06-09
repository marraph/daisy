"use client"

import React, {useState} from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

interface SwitchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    firstTitle: string;
    secondTitle: string;
    onClick?: () => void;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ firstTitle, secondTitle, onClick, className, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(true);

    const handleClick = () => {
        setSelectedValue(!selectedValue);
        if (onClick) onClick();
    }

    return (
        <div
            className={cn("relative flex items-center rounded-lg font-normal cursor-pointer text-gray bg-dark border border-white border-opacity-20 text-sm w-max", className)}
            {...props}
            onClick={handleClick}
        >
                <motion.div
                className="absolute flex flex-row w-min h-full items-center px-0.5"
                initial={false}
                animate={{x: selectedValue ? 0 : '98%'}}
                transition={{type: 'spring', stiffness: 500, damping: 30, duration: 0.2}}
                >
                    <span className="bg-black text-white rounded-lg px-2 py-0.5">
                        {selectedValue ? firstTitle : secondTitle}
                    </span>
                </motion.div>
            <div
                className={selectedValue ? "bg-dark text-gray mr-1 rounded-lg px-2 py-0.5 hover:text-white" : "bg-dark text-gray rounded-lg px-2 py-0.5 hover:text-white"}>
                {firstTitle}
            </div>
            <div
                className={selectedValue ? "bg-dark text-gray rounded-lg px-2 py-0.5 hover:text-white" : "bg-dark text-gray ml-1 rounded-lg px-2 py-0.5 hover:text-white"}>
                {secondTitle}
            </div>
        </div>
    );
};

