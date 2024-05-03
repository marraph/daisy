import { cva, VariantProps } from "class-variance-authority";
import React, {useState} from "react";
import { cn } from "../../utils/cn";
import {Button} from "../button/Button";

const switchButton = cva("group flex items-center", {
    variants: {
        size: {
            small: ["text-sm", "py-1", "px-2"],
            medium: ["text-base", "py-2", "px-4"],
            large: ["text-lg", "py-2", "px-5"],
        }
    },
    defaultVariants: {
        size: "medium",
    },
});

export interface SwitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof switchButton> {
    firstTitle: string;
    secondTitle: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ size, firstTitle, secondTitle, className, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(firstTitle);

    const handleClick = (title: string) => {
        setSelectedValue(title);

    };

    return (
        <div className={"relative inline-block"}>
            <Button className={cn(switchButton({ size }), className)} {...props} onClick={() => handleClick(firstTitle)}>
                {firstTitle}
            </Button>
            <Button className={cn(switchButton({ size }), className)} {...props} onClick={() => handleClick(secondTitle)}>
                {secondTitle}
            </Button>
        </div>
    );
};