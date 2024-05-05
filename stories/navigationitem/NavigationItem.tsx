import React, {ReactElement, useState} from "react";

export interface NavigationItemProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
    icon: ReactElement;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ title, icon }) => {
    const [selected, setSelected] = useState(false);

    return (
        <div className={selected ?
            "group text-lg rounded-lg font-semibold cursor-pointer flex items-center " +
            "bg-selected text-white border-2 border-white border-opacity-20" :
            "group bg-black text-gray text-lg rounded-lg font-semibold cursor-pointer " +
            "flex items-center hover:bg-selected"}
            style={{width: 240}} onClick={() => setSelected(true)}>

            {React.cloneElement(icon, {
                size: 20,
                className: selected ?
                    "m-3 text-white flex items-center" :
                    "m-3 group-hover:text-white flex items-center"
            })}
            <p className={"m-2 font-bold group-hover:text-white"}>
                {title}
            </p>
        </div>
    );
};