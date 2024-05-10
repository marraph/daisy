import React, {HTMLAttributes, useState} from "react";
import {cn} from "../../utils/cn";

const Switch: React.FC<HTMLAttributes<HTMLInputElement>> = ({ className }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className={cn("flex items-center cursor-pointer", className)}>
            <div className={cn("relative", className)}>
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={toggleSwitch}
                />
                <div className={cn(`absolute w-12 h-7 bg-black rounded-full shadow-inner ${isChecked ? 'bg-white' : 'bg-dark'}`, className)}>
                </div>
                <div className={cn(`absolute left-1 top-1 w-5 h-5 bg-black rounded-full transition transform ${isChecked ? 'translate-x-5' : 'translate-x-0'}`, className)}>
                </div>
            </div>
        </label>
    );
}
Switch.displayName = "Switch";

export { Switch };

