import React, {useState} from "react";
import { cn } from "../../utils/cn";

interface SwitchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    firstTitle: string;
    secondTitle: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ firstTitle, secondTitle, className, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(true);

    const handleClick = (selected: boolean) => {
        setSelectedValue(selected);
    };

    return (
        <div className={cn("flex items-center rounded-lg font-semibold cursor-pointer text-small text-gray bg-dark p-0.5 border border-white border-opacity-20 text-base", className)} {...props}>
            <div className={selectedValue ?
                "bg-black text-white mr-1 rounded-lg px-2 py-0.5" :
                "bg-dark text-gray mr-1 rounded-lg px-2 py-0.5 hover:text-white"}
                 onClick={() => handleClick(true)}>
                {firstTitle}
            </div>
            <div className={selectedValue ?
                "bg-dark text-gray rounded-lg px-2 py-0.5 hover:text-white" :
                "bg-black text-white rounded-lg px-2 py-0.5"}
                 onClick={() => handleClick(false)}>
                {secondTitle}
            </div>
        </div>
    );
};

