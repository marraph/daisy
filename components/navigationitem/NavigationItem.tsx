"use client";

import React, {ReactNode, useState} from "react";
import {cn} from "../../utils/cn";

interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: ReactNode;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ title, icon, ...props }) => {
    const [selected, setSelected] = useState(false);

    return (
        <div className={selected ?
            "text-sm rounded-lg font-normal cursor-pointer flex items-center bg-selected text-white border border-white border-opacity-20" :
            "bg-black text-gray text-sm rounded-lg font-normal cursor-pointer flex items-center hover:bg-selected hover:text-white border border-white border-opacity-0"}
            style={{width: 240}} onClick={() => setSelected(true)}
            {...props}>
            <div className={cn("m-2 ml-4 mr-2")}>
                {icon}
            </div>
            <p className={"m-2"}>
                {title}
            </p>
        </div>
    );
};

export { NavigationItem };