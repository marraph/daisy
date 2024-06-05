"use client";

import React, {createContext, ReactNode, useContext, useState} from "react";
import {cn} from "../../utils/cn";

interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: ReactNode;
    selected: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ title, icon, selected, ...props }) => {
    return (
        <div className={selected ?
            "text-sm rounded-lg font-normal cursor-pointer flex items-center bg-selected text-white border border-white border-opacity-20" :
            "bg-black text-gray text-sm rounded-lg font-normal cursor-pointer flex items-center hover:bg-selected hover:text-white border border-white border-opacity-0"}
            style={{width: 240}}
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

const NavigationContext = createContext({
    selectedItem: 'Dashboard',
    setSelectedItem: (item) => {},
});

const NavigationProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState('Dashboard');

    return (
        <NavigationContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </NavigationContext.Provider>
    );
};

const useNavigation = () => useContext(NavigationContext);

export { NavigationItem, NavigationProvider, useNavigation };