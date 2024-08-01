"use client";

import React, {forwardRef, ReactNode, useEffect, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronRight} from "lucide-react";
import { Shortcut } from "../shortcut/Shortcut";
import ReactDOM from "react-dom";
import {useOutsideClick} from "../../utils/clickOutside";

interface ContextMenuPortalProps {
    children: ReactNode;
}

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    shortcut?: string;
    icon?: ReactNode;
    onClick?: () => void;
    selectItems?: { id: number, title: string, icon: ReactNode, selected: boolean }[];
}

const ContextMenuPortal: React.FC<ContextMenuPortalProps> = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.body
    );
}


const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ title, icon, shortcut, selectItems, onClick, className, ...props }) => {
    const [open, setOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [items, setItems] = useState<{ id: number, title: string, icon: ReactNode, selected: boolean }[]>(selectItems || []);
    const itemRef = useRef<HTMLDivElement>(null);

    const menuRef = useOutsideClick(() => {
        setOpen(false);
    });

    useEffect(() => {
        if (open && itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.top, left: rect.right + 8 });
        }
    }, [open]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (items.length > 0) {
            setOpen(!open);
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <div ref={menuRef}>
            <div
                className={
                    cn("w-full bg-black cursor-pointer rounded-lg hover:bg-dark hover:text-white " +
                    "p-2 flex flex-row justify-between items-center space-x-4",
                    open && "bg-dark text-white", className)
            }
                onClick={handleClick}
                ref={itemRef}
                {...props}
            >
                <div className={"flex flex-row items-center space-x-2"}>
                    {icon && icon}
                    <span>{title}</span>
                </div>
                {!selectItems && shortcut &&
                    <Shortcut text={shortcut}/>
                }
                {selectItems &&
                    <ChevronRight size={16}/>
                }
            </div>

            {selectItems && open &&
                <ContextMenuPortal>
                    <div className={"absolute flex flex-col space-y-1 p-1 bg-black cursor-pointer rounded-lg border border-edge"}
                         style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
                         ref={menuRef}
                    >
                        {items.map((item: any, index: number) =>
                            <div key={index}
                                 className={cn("flex flex-row items-center space-x-2 px-2 py-1 rounded-lg text-gray hover:bg-dark",
                                     item.selected && "bg-dark text-white"
                                 )}
                                 onClick={() => {
                                     if (item.selected) setItems(items.map((i) => ({ ...i, selected: false })));
                                     else setItems(items.map((i) => (i.id === item.id ? { ...i, selected: true } : { ...i, selected: false })));
                                 }}
                            >
                                {item.icon && item.icon}
                                <span>{item.title}</span>
                                {item.selected && <Check size={16}/>}
                            </div>
                        )}
                    </div>
                </ContextMenuPortal>
            }
        </div>

    );
};


const ContextMenu = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <div className={cn("z-50 rounded-lg font-normal p-1 bg-black text-gray border border-edge", className)} ref={ref} {...props}>
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement<ContextMenuItemProps>(child)) {
                    return React.cloneElement(child, {
                        onClick: () => {
                            child.props.onClick && child.props.onClick();
                        },
                    });
                }
                return child;
            })}
        </div>
    )

});
ContextMenu.displayName = "ContextMenuItem";


export {ContextMenu, ContextMenuItem};