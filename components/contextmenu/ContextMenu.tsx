"use client";

import React, {HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState} from "react";
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
            small: ["text-xs", "p-0.5"],
            medium: ["text-sm", "p-1"],
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


const ContextMenuDropDownItemPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ size, title, icon, shortcut, onClick, className, ...props }) => {
    return (
        <div className={cn(contextMenuItem({size}),
             "bg-zinc-200 dark:bg-dark text-zinc-800 hover:text-white", className)}
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
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [items, setItems] = useState<{ id: number, title: string, icon: ReactNode, selected: boolean }[]>(selectItems || []);
    const [open, setOpen] = useState(false);
    const menuRef = useOutsideClick(() => setOpen(false));
    const itemRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (items.length > 0) {
            setOpen(!open);
        }
        if (onClick) {
            onClick();
        }
    };

    useEffect(() => {
        if (open && itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.top, left: rect.right + 8 });
        }
    }, [open]);


    return (
        <div ref={menuRef}>
            <div className={cn(contextMenuItem({size}), "bg-zinc-200 dark:bg-dark text-zinc-800 hover:text-white", className)}
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
            <ContextMenuDropDownItemPortal>
                <div className={"absolute flex flex-col space-y-1 p-1 bg-zinc-100 dark:bg-black cursor-pointer rounded-lg border border-zinc-300 dark:border-edge"}
                     style={{top: dropdownPosition.top, left: dropdownPosition.left}}
                     ref={menuRef}
                >
                    {items.map((item: any, index: number) =>
                        <div key={index}
                             className={cn("flex flex-row items-center text-sm space-x-2 px-2 py-1 rounded-lg text-zinc-700 dark:text-gray hover:bg-zinc-200 dark:hover:bg-dark",
                                 item.selected && "bg-zinc-200 dark:bg-dark text-zinc-800 dark:text-white"
                             )}
                             onClick={() => {
                                 if (item.selected) setItems(items.map((i) => ({ ...i, selected: false })));
                                 else setItems(items.map((i) => (i.id === item.id ? { ...i, selected: true } : { ...i, selected: false })));
                                 onItemClick(item);
                             }}
                        >
                            {item.icon && item.icon}
                            <span>{item.title}</span>
                            {item.selected && <Check size={16}/>}
                        </div>
                    )}
                </div>
            </ContextMenuDropDownItemPortal>
        </div>
    );
}


const ContextMenuSelectItem: React.FC<ContextMenuSelectItemProps> = ({}) => {
    return (

    );
}

const ContextMenuHeader: React.FC<ContextMenuHeaderProps> = ({}) => {
    return (

    );
}

const ContextMenuFooter: React.FC<ContextMenuFooterProps> = ({}) => {
    return (

    );
}

const ContextMenuLabel: React.FC<ContextMenuLabelProps> = ({}) => {
    return (

    );
}


const ContextMenu: React.FC<ContextMenuProps> = ({ children, xPos, yPos, size }, ref) => {
    const [menuPosition, setMenuPosition] = useState<{top: number | null, left: number | null}>({ top: null, left: null });

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
}

export {
    ContextMenu,
    ContextMenuItem,
    ContextMenuDropDownItem
};