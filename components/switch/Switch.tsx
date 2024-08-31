"use client";

import React, {forwardRef, HTMLAttributes, useImperativeHandle, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {GitBranch} from "lucide-react";

interface SwitchProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    preSelectedValue?: boolean;
}

type SwitchRef = HTMLLabelElement & {
    getValue: () => boolean;
    setValue: (value: boolean) => void;
};

const Switch = forwardRef<SwitchRef, SwitchProps>(({ preSelectedValue, className, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState<boolean>(preSelectedValue ?? false);

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
            <div className={cn("border border-zinc-200 dark:border-edge absolute w-14 h-8 rounded-full shadow-inner",
                 isChecked ? "bg-zinc-800 dark:bg-white border-edge" : "bg-zinc-300 dark:bg-dark-light", className)}
            />
            <div className={cn("absolute left-1 -top-3 w-6 h-6 bg-zinc-100 dark:bg-black rounded-full transition transform",
                 isChecked ? 'translate-x-6' : 'translate-x-0', className)}
            />
        </label>
    );
});
Switch.displayName = "Switch";

export {
    Switch,
    type SwitchRef
};

