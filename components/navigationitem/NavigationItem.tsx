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
            "w-full text-sm rounded-lg font-normal cursor-pointer flex items-center bg-dark text-white border border-edge" :
            "w-full bg-black text-gray text-sm rounded-lg font-normal cursor-pointer flex items-center hover:bg-dark hover:text-white border border-edge border-opacity-0"}
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

interface NavigationContextProps {
    selectedItem: string;
    setSelectedItem: (item: string) => void;
}

const NavigationContext = createContext<NavigationContextProps>({
    selectedItem: '',
    setSelectedItem: () => {}
});

const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState<string>('');

    return (
        <NavigationContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </NavigationContext.Provider>
    );
};

const useNavigation = () => useContext(NavigationContext);

export { NavigationItem, NavigationProvider, useNavigation };