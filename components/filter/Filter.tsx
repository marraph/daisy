"use client";

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Check, ChevronRight, Filter} from "lucide-react";
import {CloseButton} from "../closebutton/CloseButton";
import {useOutsideClick} from "../../utils/clickOutside";
import {motion} from "framer-motion";

type Filter = {
    key: string,
    value: string | null,
}

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
    onFilterChange?: (filters: Filter | null) => void;
    onResetTeamSelected?: () => void;
}

interface FilterItemProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
    data?: string[];
    title: string;
    icon?: React.ReactNode;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onItemSelect?: (item: string) => void;
    selectedItem?: string | null;
}

type FilterRef = HTMLDivElement & {
    getSelectedItems: () =>  Filter[];
    reset: () => void;
};

function putFilterInCache(sessionStorage: Storage, filters: Filter[], key: string, value: string | null): Filter[] {
    filters.push({key, value});
    sessionStorage.setItem('filters', JSON.stringify(filters));
    return filters;
}

function getFilterFromCache(sessionStorage: Storage): Filter[] {
    return Array(JSON.parse(sessionStorage.getItem('filters'))) ?? [];
}


const FilterItem = forwardRef<HTMLDivElement, FilterItemProps>(({title, icon, data, isOpen, onOpen, onClose, onItemSelect, selectedItem, className, ...props}, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const toggleOpen = () => {
        if (isOpen) onClose();
        else onOpen();
    };

    const handleItemClick = (item: string) => {
        if (onItemSelect) onItemSelect(item);
    };

    return (
        <div className={"relative"}>
            <div className={`cursor-pointer text-gray text-sm hover:text-white hover:bg-dark m-1 py-1 rounded-lg flex flex-row items-center justify-between 
            ${isOpen || isHovered ? 'bg-dark text-white' : 'hover:bg-dark hover:text-white'}`}
                 onClick={toggleOpen}
                 onMouseEnter={toggleOpen}>

                <div className={"flex flex-row items-center px-2 py-1 space-x-2"}>
                    {icon && icon}
                    <span>{title}</span>
                </div>
                <ChevronRight size={16} className={`${isOpen || isHovered ? 'visible' : 'invisible'}`}/>
            </div>
            {(isOpen || isHovered) && data.length > 0 &&
                <motion.div
                    className={"absolute left-full top-0 ml-2 pb-1 space-y-1 bg-black rounded-lg border border-white border-opacity-20 whitespace-nowrap overflow-hidden"}
                    initial={{width: 0}}
                    animate={{width: isOpen || isHovered ? 'auto' : 0}}
                    transition={{duration: 0.2}}>

                    {data.map((title) => (
                        <div key={title} className={`flex flex-row items-center m-1 text-gray text-sm rounded-lg cursor-pointer hover:text-white hover:bg-dark
                        ${selectedItem === title ? 'bg-dark text-white' : 'hover:bg-dark hover:text-white'}`}
                             onClick={() => handleItemClick(title)}>
                            {selectedItem === title && <Check size={16} className="ml-2"/>}
                            <span className={"px-2 py-1"}>{title}</span>
                        </div>
                    ))}
                </motion.div>
            }
        </div>
    );
});
FilterItem.displayName = "FilterItem";


const FilterButton = forwardRef<FilterRef, FilterProps>(({onFilterChange, onResetTeamSelected, className, ...props}, ref) => {
    const [filterList, setFilterList] = useState<Filter[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [openItem, setOpenItem] = useState<string | null>(null);
    const [height, setHeight] = useState(0);
    const motionRef = useRef(null);

    useEffect(() => {
        if (motionRef.current) {
            setHeight(motionRef.current.scrollHeight + 10);
        }
    }, [showFilter, props.children]);


    const menuRef = useOutsideClick(() => {
        closeMenus();
    });

    const deleteFilter = () => {
        setFilterList(null);
        closeMenus();
        if (onFilterChange) {
            onFilterChange(null);
        }
        if (onResetTeamSelected) {
            onResetTeamSelected();
        }
    }

    const closeMenus = () => {
        setShowFilter(false);
        setOpenItem(null);
    }

    const handleItemSelect = (item: string, title: string) => {
        const newFilterList = {
            ...filterList,
            [title]: filterList[title] === item ? null : item,
        };
        setFilterList(newFilterList);
        if (onFilterChange) {
            onFilterChange({key: item, value: title});
        }
    }

    const filterRef = useRef<FilterRef>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setFilterList([]),
        getSelectedItems: () => filterList,
        ...filterRef.current
    }));

    return (
        <div className={"relative space-y-1"} ref={menuRef} {...props}>
            <div className={"flex flex-row"}>
                <button className={
                    `w-max h-8 flex flex-row items-center space-x-2 bg-black rounded-lg text-sm font-normal text-gray border border-white border-opacity-20
                    ${Object.values(filterList).filter(Boolean).length <= 0 ?
                        "hover:text-white hover:bg-dark px-4 rounded-lg" :
                        "hover:text-white hover:bg-dark pl-4 pr-4 rounded-l-lg rounded-r-none border-r-0"}`
                }
                        onClick={() => {
                            closeMenus();
                            setShowFilter(!showFilter);
                        }}>
                    <Filter size={20} className={"mr-1 my-2"}/>
                    <span className={"flex flex-row py-2"}>
                        {Object.values(filterList).filter(Boolean).length <= 0 ? "Filter" :
                            `${Object.values(filterList).filter(Boolean).length} Filter`}
                    </span>
                </button>
                {Object.values(filterList).filter(Boolean).length > 0 &&
                    <div
                        className={"group flex flex-row h-8 rounded-r-lg bg-black items-center border border-white border-opacity-20 hover:bg-dark hover:text-white"}
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteFilter()
                        }}>
                        <CloseButton
                            className={"group-hover:bg-dark group-hover/close:text-white bg-black w-full h-full rounded-l-none"}/>
                    </div>
                }
            </div>
            {showFilter &&
                <div className={"absolute left-0 mt-2 z-50 bg-black rounded-lg border border-white border-opacity-20 whitespace-nowrap"} ref={motionRef}>
                    {React.Children.map(props.children, (child) => {
                        if (React.isValidElement<FilterItemProps>(child)) {
                            return React.cloneElement(child, {
                                isOpen: openItem === child.props.title,
                                onOpen: () => setOpenItem(child.props.title),
                                onClose: () => setOpenItem(null),
                                onItemSelect: (item: string) => handleItemSelect(item, child.props.title),
                                selectedItem: filterList[child.props.title],
                            });
                        }
                        return child;
                    })}
                </div>
            }
        </div>
    )
});
FilterButton.displayName = "FilterButton";


export {FilterButton, FilterItem, FilterRef, Filter, getFilterFromCache, putFilterInCache};

