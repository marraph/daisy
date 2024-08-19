"use client";

import React, {ReactNode, useState} from "react";
import {Seperator} from "@/components/seperator/Seperator";
import {cn} from "@/utils/cn";

interface TabProps {
    children: ReactNode;
}

interface TabHeaderProps {
    children: ReactNode;
    titles: string[];
}

const Tab: React.FC<TabProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

const TabHeader: React.FC<TabHeaderProps> = ({ children, titles }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={"flex flex-col"}>

            <div className={"flex flex-row space-x-2 p-2"}>
                {titles.map((title: string, index: number) => (
                    <div key={index}
                         className={cn("px-2 py-1 border-b-0 cursor-pointer text-zinc-600 dark:text-gray",
                             ({"text-zinc-800 dark:text-white border-b border-zinc-800 dark:border-white": activeTab === index})
                         )}
                         onClick={() => setActiveTab(index)}
                    >
                        <span>{title}</span>
                    </div>
                ))}
            </div>
            <div className={"w-full h-full"}>
                {React.Children.toArray(children)[activeTab]}
            </div>

        </div>
    );
}

export {Tab, TabHeader};