import { cva, VariantProps } from "class-variance-authority";
import React, {useState} from "react";
import { cn } from "../../utils/cn";
import {Button} from "../button/Button";
import {ChevronsUpDown} from "lucide-react";

const combobox = cva("group flex items-center", {
    variants: {
        text_color: {
            white: ["text-white"],
            gray: ["text-gray"],
        },
    },
    defaultVariants: {
        text_color: "white",
    },
});

export interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof combobox> {
    buttonTitle: string;
    options: string[];
}

export const Combobox: React.FC<ComboboxProps> = ({ text_color, buttonTitle, options, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedValue(option);
        setIsOpen(false);
    };

    return (
        <div className={"relative inline-block"}>
            <Button scaling={"none"} className={cn(combobox({ text_color }), className)} {...props} onClick={handleButtonClick}>
                {selectedValue || buttonTitle}
                <ChevronsUpDown className={"group-hover:text-white ml-6 text-gray"} size={15}/>
            </Button>
            {isOpen && (
                <div className={"absolute top-full flex flex-col w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray"}>
                    {options.map((option, index) => (
                        <div key={index} className="bg-black text-gray cursor-pointer rounded-md hover:bg-selected hover:text-white py-2 pl-2" onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};