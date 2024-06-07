"use client"

import React, {useState} from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

interface SwitchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    firstTitle: string;
    secondTitle: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ firstTitle, secondTitle, className, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(true);

    return (
        <div
            className={cn("relative flex items-center rounded-lg font-normal cursor-pointer text-gray bg-dark border border-white border-opacity-20 text-sm w-full", className)}
            {...props}
            onClick={() => setSelectedValue(!selectedValue)}
        >
                <motion.div
                className="absolute flex flex-row w-full h-full items-center px-0.5"
                initial={false}
                animate={{x: selectedValue ? 0 : '48%'}}
                transition={{type: 'spring', stiffness: 500, damping: 30, duration: 0.5}}
                >
                    <div className="bg-black text-white mr-1 rounded-lg px-2 py-0.5">
                        {selectedValue ? firstTitle : secondTitle}
                    </div>
                </motion.div>
            <div
                className={selectedValue ? "bg-dark text-gray mr-1 rounded-lg px-2 py-0.5 hover:text-white" : "bg-dark text-gray rounded-lg px-2 py-0.5 hover:text-white"}>
                {firstTitle}
            </div>
            <div
                className={selectedValue ? "bg-dark text-gray rounded-lg px-2 py-0.5 hover:text-white" : "bg-dark text-gray mr-1 rounded-lg px-2 py-0.5 hover:text-white"}>
                {secondTitle}
            </div>
        </div>
    );
};

