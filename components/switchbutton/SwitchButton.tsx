"use client"

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import {SwitchRef} from "../switch/Switch";

interface SwitchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    firstTitle: string;
    secondTitle: string;
    preSelectedValue?: boolean;
    onClick?: () => void;
}

type SwitchButtonRef = HTMLDivElement & {
    getValue: () => boolean;
    setValue: (value: boolean) => void;
}

const SwitchButton = forwardRef<SwitchButtonRef, SwitchButtonProps>(({ preSelectedValue, firstTitle, secondTitle, onClick, className, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState<boolean>(preSelectedValue ?? false);
    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const [firstWidth, setFirstWidth] = useState(0);
    const [secondWidth, setSecondWidth] = useState(0);

    useEffect(() => {
        if (firstRef.current && secondRef.current) {
            setFirstWidth(firstRef.current.offsetWidth);
            setSecondWidth(secondRef.current.offsetWidth);
        }
    }, [firstTitle, secondTitle]);

    const handleClick = () => {
        setSelectedValue(!selectedValue);
        onClick && onClick();
    };

    return (
        <div
            className="relative flex items-center rounded-lg font-normal cursor-pointer text-gray bg-dark-light border border-white border-opacity-20 text-sm w-max pl-1 py-0.5"
            onClick={handleClick}
        >
            <motion.div
                className="absolute flex flex-row w-max h-full items-center"
                initial={false}
                animate={{ x: selectedValue ? 0 : firstWidth }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.2 }}
                style={{ width: selectedValue ? firstWidth : secondWidth }}
            >
                <span className="bg-black-light text-white rounded-lg px-2 py-0.5">
                    {selectedValue ? firstTitle : secondTitle}
                </span>
            </motion.div>
            <div
                ref={firstRef}
                className={selectedValue ? "bg-dark-light text-gray rounded-lg px-2 py-1 hover:text-white" : "bg-dark-light text-gray rounded-lg px-2 py-1 hover:text-white"}
            >
                {firstTitle}
            </div>
            <div
                ref={secondRef}
                className={selectedValue ? "bg-dark-light text-gray rounded-lg px-2.5 py-1 hover:text-white" : "bg-dark-light text-gray rounded-lg px-2.5 py-1 hover:text-white"}
            >
                {secondTitle}
            </div>
        </div>
    );
});
SwitchButton.displayName = "SwitchButton";

export { SwitchButton, SwitchButtonRef }

