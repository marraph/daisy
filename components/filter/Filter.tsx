import React, {useState} from "react";
import {ListFilter} from "lucide-react";
import {CloseButton} from "../closebutton/CloseButton";

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {

}

interface FilterItemProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
    data?: string[];
    title: string;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}


const FilterItem = React.forwardRef<HTMLDivElement, FilterItemProps>(({ title, data, isOpen, onOpen, onClose, className, ...props }, ref) => {
    const toggleOpen = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };

    return (
        <div className={"relative"}>
            <div className={"cursor-pointer text-gray text-sm hover:text-white hover:bg-dark mx-2 my-1 rounded-lg "}
                 onClick={() => toggleOpen()}>
                <span className={"px-2 py-1"}>{title}</span>
            </div>
            {isOpen &&
                <div className={"absolute left-full top-0 ml-2 py-2 space-y-1 w-max bg-black rounded-lg border border-white border-opacity-20"}>
                    {data.map((title) => (
                        <div key={title} className={"mx-2 my-1 text-gray text-sm rounded-lg cursor-pointer hover:text-white hover:bg-dark"}>
                            <span className={"px-2 py-1"}>{title}</span>
                        </div>
                    ))}
                </div>
            }
        </div>

    );
});
FilterItem.displayName = "FilterItem";


const Filter = React.forwardRef<HTMLDivElement, FilterProps>(({ className, ...props }, ref) => {
    const [filterList, setFilterList] = useState<string[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [openItem, setOpenItem] = useState<string | null>(null);

    const deleteFilter = () => {
        setFilterList([]);
        closeMenus();
    }

    const closeMenus = () => {
        setShowFilter(false);
        setOpenItem(null);
    }

    return (
        <div className={"relative space-y-2 pb-8"} ref={ref} {...props}>
            <button className={filterList.length <= 0 ?
                "group w-min h-8 flex flex-row items-center space-x-2 bg-black rounded-lg border border-white border-opacity-20 text-sm font-normal text-gray " +
                "hover:text-white hover:bg-dark py-2 px-4" :
                "group w-min h-8 flex flex-row items-center space-x-2 bg-black rounded-lg border border-white border-opacity-20 text-sm font-normal text-gray " +
                "hover:text-white hover:bg-dark py-2 pl-4 pr-1"
            }
                    onClick={() => {
                        setShowFilter(!showFilter);
                    }}>
                <ListFilter size={20} className={"mr-2"}/>
                {filterList.length <= 0 ? "Filter" : `${filterList.length} Filter`}
                {filterList.length > 0 &&
                    <CloseButton className={"bg-black group-hover:bg-dark"} onClick={(e) => {
                        e.stopPropagation();
                        deleteFilter();
                    }}/>}
            </button>
                {showFilter &&
                    <div className={"bg-black rounded-lg border border-white border-opacity-20 py-2"}>
                        {React.Children.map(props.children, (child) => {
                            if (React.isValidElement<FilterItemProps>(child)) {
                                return React.cloneElement(child, {
                                    isOpen: openItem === child.props.title,
                                    onOpen: () => setOpenItem(child.props.title),
                                    onClose: () => setOpenItem(null),
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