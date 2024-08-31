"use client";

import React, {HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {cn} from "../../utils/cn";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface TabHeaderProps {
    children: ReactNode;
    titles: string[];
}

const Tab: React.FC<TabProps> = ({children, className, ...props}) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}

const TabHeader: React.FC<TabHeaderProps> = ({ children, titles }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const [indicatorStyle, setIndicatorStyle] = useState({ left: "0", width: "0", top: "0", opacity: 0 });
    const [isMounted, setIsMounted] = useState(false);

    const setTabRef = useCallback((el: HTMLDivElement | null, index: number) => {
        if (el) {
            tabRefs.current.set(index, el);
        } else {
            tabRefs.current.delete(index);
        }
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const updateIndicator = () => {
            if (!isMounted) return;
            
            const activeTabElement = tabRefs.current.get(activeTab);
            if (activeTabElement) {
                const { offsetLeft, offsetWidth } = activeTabElement;
                setIndicatorStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                    top: `${activeTabElement.offsetTop + activeTabElement.offsetHeight}px`,
                    opacity: 1,
                });
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeTab, isMounted]);

    return (
        <div className={"h-full flex flex-col"}>
            <div className={"flex flex-row space-x-2"}>
                {titles.map((title: string, index: number) => (
                    <div key={title}
                         ref={(el) => setTabRef(el, index)}
                         className={cn("px-2 py-1  cursor-pointer text-zinc-500 dark:text-gray",
                             ({"text-zinc-800 dark:text-white": activeTab === index}),
                             ({"pl-0": index === 0}),
                         )}
                         onClick={() => setActiveTab(index)}
                    >
                        <span>{title}</span>
                    </div>
                ))}
            </div>
            <div className={"h-[2px] w-full rounded-full bg-zinc-300 dark:bg-edge"}/>
            <div
                className="h-[2px] absolute rounded-full bg-zinc-800 dark:bg-white transition-all duration-300 ease-in-out"
                style={indicatorStyle}
            />
            <div className={"w-full h-full"}>
                {React.Children.toArray(children)[activeTab]}
            </div>

        </div>
    );
}

export {Tab, TabHeader};