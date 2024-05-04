import { cva, VariantProps } from "class-variance-authority";
import React, {useState} from "react";
import { cn } from "../../utils/cn";

const switchButton = cva("flex items-center rounded-md font-semibold cursor-pointer text-gray bg-dark p-0.5 border border-white border-opacity-20", {
    variants: {
        size: {
            small: "text-sm",
            medium: "text-base",
            large: "text-lg",
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

export interface SwitchButtonProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof switchButton> {
    firstTitle: string;
    secondTitle: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ size, firstTitle, secondTitle, className, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(true);

    const handleClick = (selected: boolean) => {
        setSelectedValue(selected);
    };

    return (
        <div className={cn(switchButton({ size }), className)} {...props}>
            <div className={selectedValue ?
                "bg-black text-white mr-1 rounded-md px-3 py-1.5" :
                "bg-dark text-gray mr-1 rounded-md px-3 py-1.5 hover:text-white"}
                 onClick={() => handleClick(true)}>
                {firstTitle}
            </div>
            <div className={selectedValue ?
                "bg-dark text-gray rounded-md px-3 py-1.5 hover:text-white" :
                "bg-black text-white rounded-md px-3 py-1.5"}
                 onClick={() => handleClick(false)}>
                {secondTitle}
            </div>
        </div>
    );
};

