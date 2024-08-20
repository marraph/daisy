"use client";

import React, {
    ChangeEvent,
    forwardRef,
    HTMLAttributes,
    MutableRefObject,
    ReactNode,
    useCallback, useEffect,
    useMemo, useRef,
    useState
} from "react";
import {cn} from "../../utils/cn";
import {Check, ChevronsUpDown, Search} from "lucide-react";
import {cva, VariantProps} from "class-variance-authority";
import {CustomScroll} from "react-custom-scroll";
import {useDropdownPosition} from "@/hooks/useDropdownPosition";
import {useOutsideClick} from "@/hooks/useOutsideCliick";
import {useHotkeys} from "react-hotkeys-hook";

const combobox = cva(
    "group/combo flex flex-row items-center cursor-pointer rounded-lg font-normal overflow-hidden " +
    "bg-zinc-100 dark:bg-black-light text-zinc-700 dark:text-gray border border-zinc-300 dark:border-edge", {
    variants: {
        size: {
            small: ["text-xs", "py-1", "px-2"],
            medium: ["text-sm", "py-1.5", "px-3"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const comboboxItem = cva(
    "flex flex-row items-center cursor-pointer rounded-lg mx-1 bg-zinc-100 dark:bg-black-light " +
    "text-zinc-700 dark:text-gray hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-dark-light", {
    variants: {
        size: {
            small: ["text-xs", "p-1"],
            medium: ["text-sm", "p-2"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

interface ComboboxItemProps<T> extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof comboboxItem> {
    title: string;
    value: T;
    isSelected?: boolean;
    isHighlighted?: boolean;
    onClick?: () => void;
}

interface ComboboxProps<T> extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof combobox> {
    buttonTitle: string;
    preSelectedValue?: T;
    children: ReactNode;
    icon?: ReactNode;
    label?: string;
    searchField?: boolean;
    getItemTitle: (item: T) => string;
    onValueChange?: (value: T | null) => void;
}


const ComboboxItem = <T,>({ size, title, value, isSelected, isHighlighted, onClick }: ComboboxItemProps<T>) => {
    return (
        <div className={cn(comboboxItem({size}), { "bg-zinc-200 dark:bg-dark-light text-zinc-800 dark:text-white": isSelected || isHighlighted })}
             onClick={onClick}
        >
            {isSelected && <Check size={12} strokeWidth={3} className={"mr-1.5"}/>}
            <span>{title}</span>
        </div>
    );
}

const Combobox = forwardRef(<T,>({ label, onValueChange, icon, size, buttonTitle, preSelectedValue, children, searchField = false, getItemTitle, ...props }: ComboboxProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<T | null>(preSelectedValue || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const menuRef: MutableRefObject<HTMLDivElement> = useOutsideClick(() => setIsOpen(false));
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownPosition = useDropdownPosition(menuRef);

    useHotkeys("up", () => setHighlightedIndex((prev) => (prev === 0 ? React.Children.count(children) - 1 : prev - 1)));
    useHotkeys("down", () => setHighlightedIndex((prev) => (prev === React.Children.count(children) - 1 ? 0 : prev + 1)));
    useHotkeys("esc", () => setIsOpen(false));
    useHotkeys("mod+f", () => {
        searchInputRef.current?.focus();
        setHighlightedIndex(-1);
    }, { preventDefault: true });
    useHotkeys("enter", () => {
        if (highlightedIndex !== -1) {
            const item = React.Children.toArray(children)[highlightedIndex] as React.ReactElement<ComboboxItemProps<T>>;
            handleItemClick(item.props.value);
        }
    }, [highlightedIndex]);

    useEffect(() => {
        if (isOpen && selectedValue) {
            setHighlightedIndex(React.Children.toArray(children).findIndex((child) => (child as React.ReactElement<ComboboxItemProps<T>>).props.value === selectedValue));
        } else {
            setHighlightedIndex(-1);
        }
    }, [children, isOpen, selectedValue]);

    const handleItemClick = useCallback((item: T) => {
        const newValue = (selectedValue === item) ? null : item;
        setSelectedValue(newValue);
        setIsOpen(false);
        setSearchQuery('');
        onValueChange?.(newValue);
    }, [onValueChange, selectedValue]);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }, []);

    const filteredChildren = useMemo(() => {
        if (!searchField) return children;

        return React.Children.map(children, (child) => {
            if (React.isValidElement<ComboboxItemProps<T>>(child)) {
                const title = getItemTitle(child.props.value);
                if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return child;
                }
            }
            return null;
        });
    }, [children, searchQuery, searchField, getItemTitle]);

    const loadComboboxContent = useCallback((scroll: boolean) => (
            <div className={"max-h-48"}>
                {searchField &&
                    <div
                        className={"w-full flex flex-row items-center space-x-2 py-1 border-b border-zinc-300 dark:border-edge rounded-t-lg"}>
                        <Search size={16} className={"text-zinc-500 dark:text-gray ml-2"}/>
                        <input placeholder={"Search"}
                               ref={searchInputRef}
                               value={searchQuery}
                               onChange={handleSearchChange}
                               onKeyDown={(e) => {
                                   if (React.Children.count(filteredChildren) > 0 && e.key === "ArrowDown") {
                                       searchInputRef.current.blur();
                                       setHighlightedIndex(0);
                                   }
                               }}
                               className={"w-full bg-zinc-100 dark:bg-black-light text-zinc-800 dark:text-white p-1 focus:outline-0 " +
                                   "placeholder-zinc-400 dark:placeholder-marcador text-sm"}
                        />
                    </div>
                }
                {React.Children.count(filteredChildren) === 0 &&
                    <div className={"text-center text-sm text-zinc-400 dark:text-marcador pt-2"}>
                        No results found
                    </div>
                }
                <div className={cn("flex flex-col space-y-1 py-1", ({"pr-1": scroll}))}>
                    {React.Children.map(filteredChildren, (child, index) => {
                        if (React.isValidElement<ComboboxItemProps<T>>(child)) {
                            return React.cloneElement(child, {
                                onClick: () => {
                                    child.props.onClick && child.props.onClick();
                                    handleItemClick(child.props.value);
                                },
                                isSelected: selectedValue === child.props.value,
                                isHighlighted: highlightedIndex === index,
                                key: index,
                                size: size
                            });
                        }
                        return child;
                    })}
                </div>
            </div>
    ), [filteredChildren, handleItemClick, handleSearchChange, highlightedIndex, searchField, searchQuery, selectedValue, size]);

    return (
        <div className={"flex flex-col space-y-1"}>
            {label &&
                <span className={"ml-1 text-zinc-400 dark:text-marcador text-xs"}>{label}</span>
            }

            <div className={"relative space-y-1"} ref={menuRef}>
                <div className={cn(combobox({size}))}
                     onClick={() => setIsOpen(!isOpen)}
                     {...props}
                >
                    <div className={"mr-2"}>{icon}</div>
                    <span>{selectedValue ? getItemTitle(selectedValue) : buttonTitle}</span>
                    <ChevronsUpDown className={"ml-2 text-zinc-700 dark:text-gray"} size={12}/>
                </div>
                {isOpen &&
                    <div className={cn(
                        "absolute z-50 max-h-48 w-max bg-zinc-100 dark:bg-black-light rounded-lg border border-zinc-300 dark:border-edge overflow-hidden shadow-2xl",
                        dropdownPosition === "left" ? "left-0" : "right-0")}
                    >
                        {React.Children.count(filteredChildren) > (size === "medium" ? 4 : 6) ?
                            <CustomScroll>
                                {loadComboboxContent(true)}
                            </CustomScroll>
                            :
                            <div>
                                {loadComboboxContent(false)}
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
});
Combobox.displayName = "Combobox";

export {Combobox, ComboboxItem};
