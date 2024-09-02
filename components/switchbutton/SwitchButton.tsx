"use client"

import React, {forwardRef, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";

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
    }, []);

    const handleClick = () => {
        setSelectedValue(!selectedValue);
        onClick?.();
    };

    return (
        <div
            className={"relative w-max flex items-center rounded-lg font-normal cursor-pointer text-sm pl-1 py-0.5" +
                "text-zinc-500 dark:text-gray bg-zinc-300 dark:bg-dark-light border border-zinc-300 dark:border-edge"}
            onClick={handleClick}
            {...props}
        >
            <motion.div
                className="absolute w-max h-full flex flex-row items-center"
                initial={false}
                animate={{ x: selectedValue ? 0 : firstWidth }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.2 }}
                style={{ width: selectedValue ? firstWidth : secondWidth }}
            >
                <span className="bg-zinc-100 dark:bg-black-light text-zinc-800 dark:text-white rounded-lg px-2 py-0.5">
                    {selectedValue ? firstTitle : secondTitle}
                </span>
            </motion.div>
            <div ref={firstRef}
                 className={"bg-zinc-300 dark:bg-dark-light text-zinc-600 dark:text-gray hover:text-zinc-800 dark:hover:text-white rounded-lg px-2 py-1"}
            >
                {firstTitle}
            </div>
            <div ref={secondRef}
                 className={"bg-zinc-300 dark:bg-dark-light text-zinc-600 dark:text-gray hover:text-zinc-800 dark:hover:text-white rounded-lg px-2.5 py-1"}
            >
                {secondTitle}
            </div>
        </div>
    );
});
SwitchButton.displayName = "SwitchButton";

export {
    SwitchButton,
    type SwitchButtonRef
};

