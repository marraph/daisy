"use client";

import React, {forwardRef, HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronRight} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import ReactDOM from "react-dom";

const contextMenu = cva(
    "absolute z-50 w-max rounded-lg font-normal text-zinc-700 dark:text-gray " +
    "bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-edge shadow-2xl", {
    variants: {
        size: {
            small: ["text-xs", "p-0.5", "space-y-0.5"],
            medium: ["text-sm", "p-1", "space-y-1"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const contextMenuItem = cva(
    "w-full flex flex-row justify-between items-center cursor-pointer rounded-lg " +
    "bg-zinc-100 dark:bg-black hover:bg-zinc-200 dark:hover:bg-dark hover:text-zinc-800 dark:hover:text-white", {
    variants: {
        size: {
            small: ["text-xs", "px-2", "py-1", "space-x-2"],
            medium: ["text-sm", "px-3", "py-2", "space-x-4"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});


interface ContextMenuProps extends VariantProps<typeof contextMenu>{
    children: ReactNode;
    xPos?: number;
    yPos?: number;
}

interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem>  {
    title: string;
    shortcut?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

interface ContextMenuDropDownItemProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem> {
    title: string;
    icon?: ReactNode;
    selectItems?: { id: number, title: string, icon: ReactNode, selected: boolean }[];
    onClick?: () => void;
    onItemClick?: (item: any) => void;
}

interface ContextMenuSelectItemProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem> {
    title: string;
    icon?: ReactNode;
    onClick?: () => void;
    selected?: boolean;
}

interface ContextMenuHeaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem> {
    title: string;
    description?: string;
    icon?: ReactNode;
}

interface ContextMenuFooterProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem> {
    title: string;
    icon?: ReactNode;
}

interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem> {
    title: string;
}

interface ContextMenuSeperatorProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuItem> {}


const ContextMenuDropDownItemPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ size, title, icon, shortcut, onClick, className, ...props }) => {

    return (
        <div className={cn(contextMenuItem({size}))}
             onClick={onClick}
             {...props}
        >
            <div className={"flex flex-row items-center space-x-2"}>
                {icon && icon}
                <span>{title}</span>
            </div>
            {shortcut &&
                <span className={"text-zinc-500 dark:text-marcador text-xs"}>
                    {shortcut}
                </span>
            }
        </div>
    );
}

const ContextMenuDropDownItem: React.FC<ContextMenuDropDownItemProps> = ({ size, title, icon, onClick, selectItems, onItemClick, className, ...props}) => {
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
    const [items, setItems] = useState<{ id: number, title: string, icon: ReactNode, selected: boolean }[]>(selectItems || []);
    const [open, setOpen] = useState(false);

    const componentRef = useOutsideClick((e) => {
        if (!dropdownRef.current.contains(e.target as Node)) setOpen(false)
    });
    const itemRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (items.length > 0) {
            setOpen(!open);
        }
        onClick?.();
    };

    const handleItemClick = useCallback((item: any, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setItems(prevItems =>
            prevItems.map(i => i.id === item.id
                ? { ...i, selected: !i.selected }
                : { ...i, selected: false }
            )
        );
        onItemClick?.(item);
    }, [onItemClick]);

    useEffect(() => {
        if (open && itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.top, left: rect.right + 8 });
        } else {
            setDropdownPosition(null);
        }
    }, [open]);


    return (
        <div ref={componentRef}>
            <div className={cn(contextMenuItem({size}), open && "bg-zinc-200 dark:bg-dark")}
                 onClick={handleClick}
                 ref={itemRef}
                 {...props}
            >
                <div className={"flex flex-row items-center space-x-2"}>
                    {icon && icon}
                    <span>{title}</span>
                </div>
                {selectItems &&
                    <ChevronRight size={16}/>
                }
            </div>
            {open && dropdownPosition &&
                <ContextMenuDropDownItemPortal>
                    <div className={"absolute flex flex-col space-y-1 p-1 bg-zinc-100 dark:bg-black cursor-pointer rounded-lg border border-zinc-300 dark:border-edge"}
                         style={{top: dropdownPosition.top, left: dropdownPosition.left}}
                         ref={dropdownRef}
                    >
                        {items.map((item: any, index: number) =>
                            <div key={index}
                                 className={cn("flex flex-row items-center text-sm space-x-2 px-2 py-1 rounded-lg text-zinc-700 dark:text-gray hover:bg-zinc-200 dark:hover:bg-dark",
                                     item.selected && "bg-zinc-200 dark:bg-dark text-zinc-800 dark:text-white"
                                 )}
                                 onClick={(e) => handleItemClick(item, e)}
                            >
                                {item.icon && item.icon}
                                <span>{item.title}</span>
                                {item.selected && <Check size={16}/>}
                            </div>
                        )}
                    </div>
                </ContextMenuDropDownItemPortal>
            }
        </div>
    );
}

const ContextMenuSelectItem: React.FC<ContextMenuSelectItemProps> = ({ size, title, icon, onClick, selected, className, ...props }) => {
    const [isSelected, setIsSelected] = useState(selected || false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsSelected(!isSelected);
        onClick?.();
    }

    return (
        <div className={cn(contextMenuItem({size}))}
             onClick={handleClick}
             {...props}
        >
            <div className={"flex flex-row items-center space-x-2"}>
                {isSelected && <Check size={16}/> }
                <span>{title}</span>
            </div>
        </div>
    );
}

const ContextMenuHeader: React.FC<ContextMenuHeaderProps> = ({ size, title, description, icon }) => {
    return (
        <div className={cn("flex flex-col rounded-t-lg border-b border-zinc-300 dark:border-edge text-zinc-800 dark:text-white",
            size === "small" ? "-m-0.5 mb-0.5 p-1 text-xs" : "-m-1 mb-1 p-2 text-sm")}
        >
            <span className={"font-medium"}>{title}</span>
            {description &&
                <div className={"flex flex-row items-center"}>
                    {icon &&
                        <div className={"mr-2"}>
                            {icon}
                        </div>
                    }
                    <span className={"text-xs text-zinc-500 dark:text-gray"}>{description}</span>
                </div>
            }

        </div>
    );
}

const ContextMenuFooter: React.FC<ContextMenuFooterProps> = ({ size, title, icon }) => {
    return (
        <div
            className={cn("flex flex-row justify-end items-center rounded-b-lg border-t border-zinc-300 dark:border-edge text-zinc-500 dark:text-gray",
                size === "small" ? "-m-0.5 mt-0.5 p-1 pb-0.5" : "-m-1 mt-1 p-2 pb-1")}
        >
            <span className={"text-xs"}>{title}</span>
            {icon &&
                <div className={"ml-2"}>
                    {icon}
                </div>
            }
        </div>
    );
}

const ContextMenuLabel: React.FC<ContextMenuLabelProps> = ({ size, title }) => {
    return (
        <div className={cn(size === "small" ? "px-0.5" : "px-1")}>
            <span className={cn("text-xs text-zinc-400 dark:text-marcador")}>{title}</span>
        </div>
    );
}

const ContextMenuSeperator: React.FC<ContextMenuSeperatorProps> = ({size}) => {
    return (
        <div className={cn("border-b border-zinc-300 dark:border-edge",
            size === "small" ? "-mx-0.5" : "-mx-1")}
        />
    );
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({children, xPos, yPos, size}, ref) => {
    const [menuPosition, setMenuPosition] = useState<{ top: number | null, left: number | null }>({top: null, left: null});

    const getPosition = useCallback(() => {
        if (ref && 'current' in ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const buffer = 32;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let left = xPos;
            let top = yPos;

            if (xPos + rect.width + buffer > windowWidth) {
                left = windowWidth - rect.width - buffer;
            }

            if (yPos + rect.height + buffer > windowHeight) {
                top = windowHeight - rect.height - buffer;
            }

            setMenuPosition({ top, left });
        }
    }, [xPos, yPos, ref]);

    useEffect(() => {
        getPosition();
    }, [getPosition]);

    return (
        <div className={cn(contextMenu({size}))}
             style={{
                 top: menuPosition.top !== null ? menuPosition.top : -9999,
                 left: menuPosition.left !== null ? menuPosition.left : -9999
             }}
             ref={ref}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement<ContextMenuItemProps>(child)) {
                    return React.cloneElement(child, {
                        size: size,
                        onClick: () => child.props.onClick?.()
                    });
                }
                return child;
            })}
        </div>
    );
});
ContextMenu.displayName = "ContextMenu";

export {
    ContextMenu,
    ContextMenuItem,
    ContextMenuDropDownItem,
    ContextMenuSelectItem,
    ContextMenuHeader,
    ContextMenuFooter,
    ContextMenuLabel,
    ContextMenuSeperator
};