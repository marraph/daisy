"use client";

import React, {forwardRef, HTMLAttributes, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {GitBranch} from "lucide-react";

type SwitchRef = HTMLLabelElement & {
    getValue: () => boolean;
    setValue: (value: boolean) => void;
};

const Switch = forwardRef<SwitchRef, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    const switchRef = useRef<SwitchRef>(null);

    useImperativeHandle(ref, () => ({
        getValue: () => isChecked,
        setValue: (value: boolean) => setIsChecked(value),
        ...switchRef.current,
    }));

    return (
        <label className={"relative flex flex-row items-center cursor-pointer"} {...props} ref={switchRef}>
            <input
                type={"checkbox"}
                className={"sr-only"}
                checked={isChecked}
                onChange={toggleSwitch}
            />
            <div className={cn(`border border-white border-opacity-20 absolute w-12 h-7 bg-black rounded-full shadow-inner ${isChecked ? 'bg-white' : 'bg-dark'}`, className)}></div>
            <div className={cn(`absolute left-1 -top-2.5 w-5 h-5 bg-black rounded-full transition transform ${isChecked ? 'translate-x-5' : 'translate-x-0'}`, className)}></div>
        </label>
    );
});
Switch.displayName = "Switch";

export {Switch, SwitchRef};

