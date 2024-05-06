import { cva, VariantProps } from "class-variance-authority";
import React, {useState} from "react";
import { cn } from "../../utils/cn";
import {Button} from "../button/Button";
import {ChevronsUpDown} from "lucide-react";

const combobox = cva("group flex items-center text-gray");

interface ComboboxItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof combobox> {
    buttonTitle: string;
}


const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(({ title, className, ...props }, ref) => (
    <div className={"bg-black text-gray cursor-pointer rounded-md hover:bg-selected hover:text-white py-2 pl-2"} ref={ref} {...props}>
        {title}
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
        <div className={"relative inline-block"}>
            <Button text={!selectedValue ? buttonTitle : selectedValue} className={cn(combobox({ }), className)} {...props} onClick={handleButtonClick}>
                <ChevronsUpDown className={"group-hover:text-white ml-6 text-gray"} size={15}/>
            </Button>
            {isOpen && (
                <div className={"absolute top-full flex flex-col w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray"}>
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

export { Combobox, ComboboxItem };
