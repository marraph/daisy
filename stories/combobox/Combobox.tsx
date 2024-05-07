import React, {ReactNode, useState} from "react";
import { cn } from "../../utils/cn";
import {Button} from "../button/Button";
import {ChevronsUpDown} from "lucide-react";

interface ComboboxItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

interface ComboboxIconProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonTitle: string;
}

const ComboboxIcon = React.forwardRef<HTMLDivElement, ComboboxIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("mr-2", className)} ref={ref} {...props}>
        {icon}
    </div>
));
ComboboxIcon.displayName = "ComboboxIcon";


const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(({ title, className, ...props }, ref) => (
    <div className={cn("bg-black text-gray cursor-pointer rounded-lg hover:bg-selected hover:text-white py-2 px-2 flex items-center", className)} ref={ref} {...props}>
        {props.children}
        <span className={""}>{title}</span>
    </div>
));
ComboboxItem.displayName = "ComboboxItem";


const Combobox: React.FC<ComboboxProps> = ({buttonTitle, className, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(null);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        console.log(selectedValue);
        setSelectedValue(item);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative inline-block", className)}>
            <Button text={!selectedValue ? buttonTitle : selectedValue} className={cn("group flex items-center text-gray whitespace-nowrap", className)} {...props} onClick={handleButtonClick}>
                <ChevronsUpDown className={cn("group-hover:text-white ml-6 text-gray", className)} size={15}/>
            </Button>
            {isOpen && (
                <div className={cn("absolute top-full flex flex-col w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray whitespace-nowrap", className)}>
                    {React.Children.map(props.children, (child) => {
                        if (React.isValidElement<ComboboxItemProps>(child)) {
                            return React.cloneElement(child, {
                                onClick: () => handleItemClick(child.props.title),
                            });
                        }
                        return child;
                    })}
                </div>
            )}
        </div>
    );
};

export { Combobox, ComboboxItem, ComboboxIcon };
