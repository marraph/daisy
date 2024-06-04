import React, {useImperativeHandle, useRef, useState} from "react";
import {Check, ChevronRight, ListFilter} from "lucide-react";
import {CloseButton} from "../closebutton/CloseButton";
import {useOutsideClick} from "../../utils/clickOutside";
import {cn} from "../../utils/cn";

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
    onFilterChange?: (filters: { [key: string]: string | null }) => void;
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

export type FilterRef = HTMLDivElement & {
    getSelectedItems: () => { [key: string]: string | null },
    reset: () => void
};


const FilterItem = React.forwardRef<HTMLDivElement, FilterItemProps>(({ title, icon, data, isOpen, onOpen, onClose, onItemSelect, selectedItem, className, ...props }, ref) => {
    const toggleOpen = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };

    const handleItemClick = (item: string) => {
        if (onItemSelect) {
            onItemSelect(item);
        }
    };

    const deleteFilter = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onItemSelect) {
            onItemSelect(null);
        }
    }

    return (
        <div className={"relative"}>
            <div className={`cursor-pointer text-gray text-sm hover:text-white hover:bg-dark mx-2 my-1 py-1 rounded-lg flex flex-row items-center justify-between 
            ${isOpen ? 'bg-dark text-white' : 'hover:bg-dark hover:text-white'}`}
                 onClick={() => toggleOpen()}>
                <div className={"flex flex-row items-center px-2 py-1 space-x-2"}>
                    {icon && icon}
                    <span>{title}</span>
                </div>
                {isOpen && <ChevronRight size={16} /> }
                {!isOpen && selectedItem &&
                    <CloseButton iconSize={12} className={"mr-1 hover:bg-black"} onClick={(e) => deleteFilter(e)}/>
                }
            </div>
            {isOpen &&
                <div className={"absolute left-full top-0 ml-2 py-2 space-y-1 w-max bg-black rounded-lg border border-white border-opacity-20"}>
                    {data.map((title) => (
                        <div key={title} className={`flex flex-row items-center mx-2 my-1 text-gray text-sm rounded-lg cursor-pointer hover:text-white hover:bg-dark
                        ${selectedItem === title ? 'bg-dark text-white' : 'hover:bg-dark hover:text-white'}`}
                        onClick={() => handleItemClick(title)}>
                            {selectedItem === title && <Check size={16} className="ml-2" />}
                            <span className={"px-2 py-1"}>{title}</span>
                        </div>
                    ))}
                </div>
            }
        </div>

    );
});
FilterItem.displayName = "FilterItem";


const Filter = React.forwardRef<HTMLDivElement, FilterProps>(({ onFilterChange, className, ...props }, ref) => {
    const [filterList, setFilterList] = useState<{ [key: string]: string | null }>({});
    const [showFilter, setShowFilter] = useState(false);
    const [openItem, setOpenItem] = useState<string | null>(null);

    const menuRef = useOutsideClick(() => {
        closeMenus();
    });

    const deleteFilter = () => {
        setFilterList({});
        closeMenus();
        if (onFilterChange) {
            onFilterChange({});
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
            onFilterChange(newFilterList);
        }
    }

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
                    <ListFilter size={20} className={"mr-2 my-2"}/>
                    <span className={"flex flex-row py-2"}>
                        {Object.values(filterList).filter(Boolean).length <= 0 ? "Filter" :
                            `${Object.values(filterList).filter(Boolean).length} Filter`}
                    </span>
                </button>
                {Object.values(filterList).filter(Boolean).length > 0 &&
                    <div className={"group flex flex-row h-8 rounded-r-lg bg-black items-center border border-white border-opacity-20 hover:bg-dark hover:text-white"}
                         onClick={(e) => {e.stopPropagation(); deleteFilter();}}>
                        <CloseButton className={"group-hover:bg-dark group-hover/close:text-white bg-black w-full h-full rounded-l-none"}/>
                    </div>
                }
            </div>
                {showFilter &&
                    <div className={"absolute left-0 mt-2 z-50 bg-black rounded-lg border border-white border-opacity-20"}>
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
Filter.displayName = "Filter";


export {Filter, FilterItem};