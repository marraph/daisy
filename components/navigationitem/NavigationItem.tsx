import React, {ReactNode, useState} from "react";
import {cn} from "../../utils/cn";

export interface NavigationIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: ReactNode;
}

export interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

const NavigationIcon = React.forwardRef<HTMLDivElement, NavigationIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("m-2 ml-4 mr-2", className)} ref={ref} {...props}>
        {icon}
    </div>
));
NavigationIcon.displayName = "NavigationIcon";


const NavigationItem: React.FC<NavigationItemProps> = ({ title, ...props }) => {
    const [selected, setSelected] = useState(false);

    return (
        <div className={selected ?
            "text-lg rounded-lg font-semibold cursor-pointer flex items-center " +
            "bg-selected text-white border-2 border-white border-opacity-20" :
            "group bg-black text-gray text-lg rounded-lg font-semibold cursor-pointer " +
            "flex items-center hover:bg-selected hover:text-white"}
            style={{width: 240}} onClick={() => setSelected(true)}>
            {props.children}
            <p className={"m-2 font-semibold"}>
                {title}
            </p>
        </div>
    );
};

export { NavigationItem, NavigationIcon };