import React, {DialogHTMLAttributes, forwardRef, ReactNode, useEffect, useRef, useState} from "react";
import {cn} from "../../utils/cn";
import {DialogRef} from "@/components/dialog/Dialog";
import {Shortcut} from "@/components/shortcut/Shortcut";
import {Seperator} from "@/components/seperator/Seperator";
import {CornerDownLeft, Info, MoveDown, MoveUp, Search} from "lucide-react";
import {Input} from "@/components/input/Input";
import {useHotkeys} from "react-hotkeys-hook";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {AnimatePresence, motion} from "framer-motion";
import {CloseButton} from "@/components/closebutton/CloseButton";

interface CommandMenuProps extends DialogHTMLAttributes<HTMLDialogElement> {
    items: CommandMenuItemProps[];
    showItems: CommandMenuItemProps[];
    isOpen?: boolean;
    onClose?: () => void;
    animation: "slide" | "fade";
}

interface CommandMenuItemProps {
    id: number;
    title: string;
    description?: string;
    icon?: ReactNode;
    onClick?: (e?: React.MouseEvent) => void;
    shortcut?: string;
    disabled?: boolean;
    selected?: boolean;
    keywords: string[];
}

const CommandMenu = forwardRef<DialogRef, CommandMenuProps>(({ isOpen, onClose, items, showItems, animation = "fade", ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredItems, setFilteredItems] = useState(showItems);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [inputFocused, setInputFocused] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useOutsideClick(() => handleClose());

    const handleClose = () => {
        setSelectedIndex(-1);
        setInputFocused(true);
        setSearchTerm('');
        setFilteredItems(showItems);
        onClose?.();
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredItems(items.filter(item => {
            return item.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase()));
        }));

        if (value.length === 0) {
            setSelectedIndex(-1);
            setFilteredItems(showItems);
        }
    }

    useHotkeys('esc', () => {
        handleClose();
    })

    useHotkeys('enter', (e) => {
        if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
            e.preventDefault();
            e.stopPropagation();
            filteredItems[selectedIndex].onClick();
            handleClose();
        }
    })

    useHotkeys('up', () => {
        if (isOpen) {
            setInputFocused(false)
            setSelectedIndex((prev) => (prev <= 0 ? filteredItems.length - 1 : prev - 1))
        }
    })

    useHotkeys('down', () => {
        if (isOpen) {
            setInputFocused(false)
            setSelectedIndex((prev) => (prev >= filteredItems.length - 1 ? 0 : prev + 1))
        }
    })

    useEffect(() => {
        if (isOpen && inputFocused) {
            inputRef.current?.focus()
        }
    }, [isOpen, inputFocused])

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    className={isOpen && "fixed inset-0 flex items-center justify-center backdrop-blur-sm backdrop:bg-black/50"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={animation === "fade" ? {scale: 0.7, opacity: 0} : { y: "50%", opacity: 0 }}
                        animate={animation === "fade" ? {scale: 1, opacity: 1} : { y: 0, opacity: 1 }}
                        exit={ animation === "fade" ? {scale: 0.7, opacity: 0} : { y: "50%", opacity: 0 }}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                        className={cn("w-[760px] rounded-lg bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-edge")}
                        role="dialog"
                        aria-modal="true"
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={"flex flex-col"}>
                            <div className={"w-full flex flex-row items-center justify-between pl-2 pr-4 pt-2 text-zinc-500 dark:text-gray"}>
                                <div className={"w-full flex flex-row items-center"}>
                                    <Search size={18}
                                            className={"ml-4 mr-2"}
                                    />
                                    <Input
                                        placeholder={"Search or type a command"}
                                        border={"none"}
                                        className={"w-full h-12 text-md m-0 mr-2 p-0 bg-zinc-100 dark:bg-black"}
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        ref={inputRef}
                                        size={80}
                                    />
                                </div>

                                <CloseButton
                                    className={"dark:bg-black"}
                                    onClick={() => {
                                        setSelectedIndex(-1);
                                        setInputFocused(true);
                                        setSearchTerm('');
                                        setFilteredItems(showItems);
                                    }}
                                />
                            </div>
                            <Seperator/>
                            <div className={"flex flex-col space-y-2 p-2 max-h-[400px] overflow-y-auto"}>
                                {filteredItems.length === 0 &&
                                    <div
                                        className={"py-4 flex flex-col space-y-2 items-center justify-center"}>
                                        <div className={"flex flex-row space-x-1 items-center text-zinc-500 dark:text-gray"}>
                                            <Info size={16}/>
                                            <span>{"No results found"}</span>
                                        </div>
                                        <span className={"text-zinc-400 dark:text-marcador"}>{"Search something different..."}</span>
                                    </div>
                                }
                                {filteredItems.length > 0 && filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={cn("w-full flex flex-row items-center justify-between px-4 py-2 " +
                                            "rounded-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-dark",
                                            item.selected ? "bg-zinc-200 dark:bg-dark" : "",
                                            item.disabled ? "opacity-50 cursor-not-allowed" : ""
                                    )}
                                        onMouseEnter={() => console.log(item.selected)}
                                         onClick={item.onClick}
                                    >
                                        <div className={"w-max flex flex-row items-center space-x-2 text-md text-zinc-800 dark:text-white"}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                            {item.description &&
                                                <span className={"text-sm text-zinc-500 dark:text-gray"}>{item.description}</span>
                                            }
                                        </div>
                                        {item.shortcut &&
                                            <Shortcut text={item.shortcut}/>
                                        }
                                    </div>
                                ))}
                            </div>
                            <Seperator/>
                            <div
                                className={"flex flex-row items-center rounded-b-lg space-x-8 px-6 h-12 bg-zinc-200 dark:bg-dark text-zinc-500 dark:text-gray text-sm"}>
                                <div className={"flex flex-row items-center space-x-2"}>
                                    <span>{"Close"}</span>
                                    <Shortcut text={"ESC"}/>
                                </div>
                                <div className={"flex flex-row items-center space-x-2"}>
                                    <span>{"Select"}</span>
                                    <Shortcut>
                                        <CornerDownLeft size={16}/>
                                    </Shortcut>
                                </div>
                                <div className={"flex flex-row items-center space-x-1"}>
                                    <span className={"mr-1"}>{"Navigate"}</span>
                                    <Shortcut>
                                        <MoveUp size={16}/>
                                    </Shortcut>
                                    <Shortcut>
                                        <MoveDown size={16}/>
                                    </Shortcut>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    );
});

export { CommandMenu, CommandMenuItemProps };